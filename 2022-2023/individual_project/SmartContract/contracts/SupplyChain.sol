// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    // State variables
    uint256 private s_lastBoxId;
    uint256 private s_lastProductId;
    uint256 private s_lastDeliveryId;

    // Structs
    struct Product {
        uint256 productId;
        string productNameZh;
        string productNameEn;
        string productType;
        string manufacturerNameZh;
        string manufacturerNameEn;
        uint256 recommendedTemperature;
        uint256 requiredTemperatureUpper;
        uint256 requiredTemperatureLower;
        uint256 recommendedHumidity;
        uint256 requiredHumidityUpper;
        uint256 requiredHumidityLower;
        uint256 lastUpdate;
    }

    struct Box {
        uint256 boxId;
        uint256 productId;
        uint256 quantity;
        uint256 weight;
        uint256 value;
        BoxStatus status;
        bool isCompliance;
        string productionDate;
        string expirationDate;
        string supplier;
        string supermarket;
        string location;
        uint256 lastUpdate;
    }

    struct Delivery {
        uint256 deliveryId;
        uint256[] boxesId;
        string truckLicensePlate;
        string sender;
        string senderAddress;
        string receiver;
        string receiverAddress;
        string estimatedDepartureDatetime;
        string actualDepartureDatetime;
        string estimatedArrivalDatetime;
        string actualArrivalDatetime;
        uint256 lastUpdate;
    }

    // Enums
    enum BoxStatus {
        PendingToStore_Supplier,
        Stored_Supplier,
        ReadyToDelivery,
        Sending,
        Arrived_Supermarket,
        Stored_Supermarket,
        HitTheStoreShelves,
        NoLongerBeSold,
        ProductRecall
    }

    // Mappings
    mapping(uint256 => Product) public s_products;
    mapping(uint256 => Box) public s_boxes;
    mapping(uint256 => Delivery) public s_deliveries;

    uint256[] public s_productKeys;
    uint256[] public s_boxKeys;
    uint256[] public s_deliveryKeys;

    // Events
    event CreateProduct(Product _product, uint256 _timestamp);
    
    event CreateBox(Box _box, uint256 _timestamp);
    event ChangeBoxLocation(Box _box, string _from, string _to, uint256 _timestamp);
    event TrackBox(Box _box, uint256 _temperature, uint256 _humidity, uint256 _timestamp);
    event BoxStoredIsNotCompliance(Box _box, uint256 _temperature, uint256 _humidity, uint256 _timestamp);
    event BoxHasRecalled(Box _box, uint256 _timestamp);

    event CreateDelivery(Delivery _delivery, uint256 _timestamp);
    event SendBox(Delivery _delivery, uint256 _timestamp);
    event SignForBox(Delivery _delivery, uint256 _timestamp);

    // Constructor
    constructor() {
        s_lastBoxId = 0;
        s_lastProductId = 0;
        s_lastDeliveryId = 0;
    }

    // Functions
    function createProduct(Product memory _product) public {
        s_lastProductId++;
        _product.productId = s_lastProductId;
        _product.lastUpdate = block.timestamp;
        s_products[s_lastProductId] = _product;
        s_productKeys.push(_product.productId);
        emit CreateProduct(s_products[s_lastProductId], block.timestamp);
    }

    function createBox(Box memory _box) public {
        s_lastBoxId++;
        _box.boxId = s_lastBoxId;
        _box.location = string.concat(_box.location, " (", _box.supplier, ")");
        _box.lastUpdate = block.timestamp;
        s_boxes[s_lastBoxId] = _box;
        s_boxKeys.push(_box.boxId);
        emit CreateBox(s_boxes[s_lastBoxId], block.timestamp);
    }

    function createDelivery(Delivery memory _delivery) internal returns (Delivery memory) {
        s_lastDeliveryId++;
        _delivery.deliveryId = s_lastDeliveryId;
        _delivery.lastUpdate = block.timestamp;
        s_deliveries[s_lastDeliveryId] = _delivery;
        s_deliveryKeys.push(_delivery.deliveryId);
        emit CreateDelivery(s_deliveries[s_lastDeliveryId], block.timestamp);
        return _delivery;
    }

    function supplierStoredBox(uint256 _boxId, string calldata _to) public {
        Box storage box = s_boxes[_boxId];
        string memory from = box.location;
        box.status = BoxStatus.Stored_Supplier;
        box.location = string.concat(_to, " (", box.supplier, ")");
        box.lastUpdate = block.timestamp;
        emit ChangeBoxLocation(s_boxes[_boxId], from, _to, block.timestamp);
    }

    function trackBox(uint256 _boxId, uint256 _temperature, uint256 _humidity) public {
        Box storage box = s_boxes[_boxId];
        Product memory product = s_products[box.productId];
        uint256 requiredTemperatureLower = product.requiredTemperatureLower;
        uint256 requiredTemperatureUpper = product.requiredTemperatureUpper;
        uint256 requiredHumidityLower = product.requiredHumidityLower;
        uint256 requiredHumidityUpper = product.requiredHumidityUpper;

        uint256 currentTemperature = _temperature;
        uint256 currentHumidity = _humidity;

        bool isTemperatureCompliance = (currentTemperature >= requiredTemperatureLower) &&
            (currentTemperature <= requiredTemperatureUpper);
        bool isHumidityCompliance = (currentHumidity >= requiredHumidityLower) &&
            (currentHumidity <= requiredHumidityUpper);
        bool isCompliance = isTemperatureCompliance && isHumidityCompliance;

        if (isCompliance) {
            emit TrackBox(box, currentTemperature, currentHumidity, block.timestamp);
        } else {
            box.isCompliance = false;
            emit TrackBox(box, currentTemperature, currentHumidity, block.timestamp);
            emit BoxStoredIsNotCompliance(box, currentTemperature, currentHumidity, block.timestamp);
        }
    }

    function readyToDelivery(Delivery calldata _delivery) public {
        Delivery memory delivery = createDelivery(_delivery);
        uint256 boxCount = delivery.boxesId.length;
        Box[] memory boxes = new Box[](boxCount);
        for (uint i = 0; i < boxCount; i++) {
            Box storage box = s_boxes[delivery.boxesId[i]];
            box.supermarket = delivery.receiver;
            box.status = BoxStatus.ReadyToDelivery;
            box.lastUpdate = block.timestamp;
            boxes[i] = s_boxes[delivery.boxesId[i]];
        }
    }

    function sendBox(uint256 _deliveryId, string calldata _actualDepartureDatetime) public {
        Delivery storage delivery = s_deliveries[_deliveryId];
        delivery.actualDepartureDatetime = _actualDepartureDatetime;
        delivery.lastUpdate = block.timestamp;

        uint256 boxCount = delivery.boxesId.length;
        for (uint i = 0; i < boxCount; i++) {
            Box storage box = s_boxes[delivery.boxesId[i]];
            string memory from = box.location;
            box.location = string.concat("Truck: ", delivery.truckLicensePlate);
            box.status = BoxStatus.Sending;
            box.lastUpdate = block.timestamp;
            emit ChangeBoxLocation(box, from, box.location, block.timestamp);
        }
        emit SendBox(delivery, block.timestamp);
    }

    function signForBox(uint256 _deliveryId, string calldata _actualArrivalDatetime) public {
        Delivery storage delivery = s_deliveries[_deliveryId];
        delivery.actualArrivalDatetime = _actualArrivalDatetime;
        delivery.lastUpdate = block.timestamp;

        uint256 boxCount = delivery.boxesId.length;
        for (uint i = 0; i < boxCount; i++) {
            Box storage box = s_boxes[delivery.boxesId[i]];
            string memory from = box.location;
            box.location = delivery.receiver;
            box.status = BoxStatus.Arrived_Supermarket;
            box.lastUpdate = block.timestamp;
            emit ChangeBoxLocation(box, from, box.location, block.timestamp);
        }
        emit SignForBox(delivery, block.timestamp);
    }

    function supermarketStoredBox(uint256 _boxId, string calldata _to) public {
        Box storage box = s_boxes[_boxId];
        string memory from = box.location;
        box.status = BoxStatus.Stored_Supermarket;
        box.location = _to;
        box.lastUpdate = block.timestamp;
        emit ChangeBoxLocation(box, from, box.location, block.timestamp);
    }

    function supermarketHitBoxToTheStoreShelves(uint256 _boxId) public {
        Box storage box = s_boxes[_boxId];
        string memory from = box.location;
        box.location = string.concat("Store Shelves");
        box.status = BoxStatus.HitTheStoreShelves;
        box.lastUpdate = block.timestamp;
        emit ChangeBoxLocation(box, from, box.location, block.timestamp);
    }

    function getAllProducts() public view returns (Product[] memory) {
        uint256 mappingLength = s_productKeys.length;
        Product[] memory result = new Product[](mappingLength);

        for (uint256 i = 0; i < mappingLength; i++) {
            result[i] = s_products[i + 1];
        }

        return result;
    }

    function getAllBoxes() public view returns (Box[] memory) {
        uint256 mappingLength = s_boxKeys.length;
        Box[] memory result = new Box[](mappingLength);

        for (uint256 i = 0; i < mappingLength; i++) {
            result[i] = s_boxes[i + 1];
        }

        return result;
    }

    function getAllDeliveries() public view returns (Delivery[] memory) {
        uint256 mappingLength = s_deliveryKeys.length;
        Delivery[] memory result = new Delivery[](mappingLength);

        for (uint256 i = 0; i < mappingLength; i++) {
            result[i] = s_deliveries[i + 1];
        }

        return result;
    }

    function getBoxesByPublicSearch(
        uint256 _productId,
        string calldata _expirationDate,
        string calldata _supermarket
    ) public view returns (uint256[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i <= s_lastBoxId; i++) {
            if (
                s_boxes[i].productId == _productId &&
                compareStrings(s_boxes[i].expirationDate, _expirationDate) &&
                compareStrings(s_boxes[i].supermarket, _supermarket)
            ) {
                count++;
            }
        }
        uint256[] memory result = new uint256[](count);
        uint256 index = 0;
        for (uint256 i = 1; i <= s_lastBoxId; i++) {
            if (
                s_boxes[i].productId == _productId &&
                compareStrings(s_boxes[i].expirationDate, _expirationDate) &&
                compareStrings(s_boxes[i].supermarket, _supermarket)
            ) {
                result[index] = i;
                index++;
            }
        }
        return result;
    }

    function getBoxesByStatus(BoxStatus _status) public view returns (uint256[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i <= s_lastBoxId; i++) {
            if (s_boxes[i].status == _status) {
                count++;
            }
        }
        uint256[] memory result = new uint256[](count);
        uint256 index = 0;
        for (uint256 i = 1; i <= s_lastBoxId; i++) {
            if (s_boxes[i].status == _status) {
                result[index] = i;
                index++;
            }
        }
        return result;
    }

    function compareStrings(string memory _a, string memory _b) public pure returns (bool) {
        return keccak256(abi.encodePacked(_a)) == keccak256(abi.encodePacked(_b));
    }
}
