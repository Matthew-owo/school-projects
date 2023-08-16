import { ethers } from "hardhat";
import dayjs from "dayjs";
import * as dotenv from "dotenv";
dotenv.config();

import { SupplyChain, SupplyChain__factory } from "../../typechain-types";
import { Result } from "@ethersproject/abi";
import { BigNumberish, ContractTransaction, ContractReceipt, BigNumber, Event } from "ethers";
import { PromiseOrValue, TypedEvent } from "../../typechain-types/common";

const connectContract = async (): Promise<SupplyChain> => {
  // Get the contract address
  const address: string | any = process.env.CONTRACT_ADDRESS;

  // Get the contract factory
  const SupplyChainFactory = await ethers.getContractFactory("SupplyChain");

  // Connect the contract on the blockchain
  const supplyChain: SupplyChain = SupplyChainFactory.attach(address);

  return supplyChain;
};

const main = async () => {
  // Connect the contract on the blockchain
  const supplyChain: SupplyChain = await connectContract();

  // Declare the product details
  const productSample: SupplyChain.ProductStruct[] = [
    {
      productId: "0",
      productNameZh: "維他 - 檸檬茶250毫升 x 6包裝",
      productNameEn: "Vita - Lemon Tea 250ml x 6 Packs",
      productType: "Drinks",
      manufacturerNameZh: "維他奶 / 維他",
      manufacturerNameEn: "VITASOY / VITA",
      recommendedTemperature: "20",
      requiredTemperatureUpper: "25",
      requiredTemperatureLower: "2",
      recommendedHumidity: "50",
      requiredHumidityUpper: "60",
      requiredHumidityLower: "50",
      lastUpdate: "0",
    },
    {
      productId: "0",
      productNameZh: "維他 - 菊花茶250毫升 x 6包裝",
      productNameEn: "Vita - Chrysanthemum Tea 250ml x 6 Packs",
      productType: "Drinks",
      manufacturerNameZh: "維他奶 / 維他",
      manufacturerNameEn: "VITASOY / VITA",
      recommendedTemperature: "20",
      requiredTemperatureUpper: "25",
      requiredTemperatureLower: "2",
      recommendedHumidity: "50",
      requiredHumidityUpper: "60",
      requiredHumidityLower: "50",
      lastUpdate: "0",
    },
    {
      productId: "0",
      productNameZh: "維他奶 - 原味豆奶 250毫升 x 6包裝",
      productNameEn: "Vitasoy - Vitasoy Soya Bean Milk 250ml x 6 Packs",
      productType: "Drinks",
      manufacturerNameZh: "維他奶 / 維他",
      manufacturerNameEn: "VITASOY / VITA",
      recommendedTemperature: "10",
      requiredTemperatureUpper: "25",
      requiredTemperatureLower: "2",
      recommendedHumidity: "50",
      requiredHumidityUpper: "70",
      requiredHumidityLower: "50",
      lastUpdate: "0",
    },
    {
      productId: "0",
      productNameZh: "維他奶 - 麥精豆奶 250毫升 x 6包裝",
      productNameEn: "Vitasoy - Vitasoy Malted Soya Bean Milk 250ml x 6 Packs",
      productType: "Drinks",
      manufacturerNameZh: "維他奶 / 維他",
      manufacturerNameEn: "VITASOY / VITA",
      recommendedTemperature: "10",
      requiredTemperatureUpper: "25",
      requiredTemperatureLower: "2",
      recommendedHumidity: "50",
      requiredHumidityUpper: "70",
      requiredHumidityLower: "50",
      lastUpdate: "0",
    },
    {
      productId: "0",
      productNameZh: "維他 - 朱古力牛奶飲品 250毫升 x 6包裝",
      productNameEn: "Vita - Chocolate Milk Beverage 250ml x 6 Packs",
      productType: "Drinks",
      manufacturerNameZh: "維他奶 / 維他",
      manufacturerNameEn: "VITASOY / VITA",
      recommendedTemperature: "10",
      requiredTemperatureUpper: "25",
      requiredTemperatureLower: "2",
      recommendedHumidity: "50",
      requiredHumidityUpper: "70",
      requiredHumidityLower: "50",
      lastUpdate: "0",
    },
    {
      productId: "0",
      productNameZh: "維他 - 清心棧竹蔗茅根 250毫升 x 6包裝",
      productNameEn: "Vita - Vita TSZ Sugarcane and Imperatae 250ml x 6 Packs",
      productType: "Drinks",
      manufacturerNameZh: "維他奶 / 維他",
      manufacturerNameEn: "VITASOY / VITA",
      recommendedTemperature: "10",
      requiredTemperatureUpper: "25",
      requiredTemperatureLower: "2",
      recommendedHumidity: "50",
      requiredHumidityUpper: "70",
      requiredHumidityLower: "50",
      lastUpdate: "0",
    },
    {
      productId: "0",
      productNameZh: "維他 - 清心棧蘋果茉莉 250毫升 x 6包裝",
      productNameEn: "Vita - Vita TSZ Apple and Jasmine 250ml x 6 Packs",
      productType: "Drinks",
      manufacturerNameZh: "維他奶 / 維他",
      manufacturerNameEn: "VITASOY / VITA",
      recommendedTemperature: "10",
      requiredTemperatureUpper: "25",
      requiredTemperatureLower: "2",
      recommendedHumidity: "50",
      requiredHumidityUpper: "70",
      requiredHumidityLower: "50",
      lastUpdate: "0",
    },
    {
      productId: "0",
      productNameZh: "維他 - 冷泡無糖凍頂烏龍茶 250毫升 x 6包裝",
      productNameEn: "Vita - Vita Cold Brew No Sugar Dong Ding Oolong Tea 250ml x 6 Packs",
      productType: "Drinks",
      manufacturerNameZh: "維他奶 / 維他",
      manufacturerNameEn: "VITASOY / VITA",
      recommendedTemperature: "4",
      requiredTemperatureUpper: "8",
      requiredTemperatureLower: "2",
      recommendedHumidity: "50",
      requiredHumidityUpper: "70",
      requiredHumidityLower: "50",
      lastUpdate: "0",
    },
    {
      productId: "0",
      productNameZh: "維他 - 冷泡無糖香片茶 250毫升 x 6包裝",
      productNameEn: "Vita - Vita Cold Brew No Sugar Jasmine Tea 250ml x 6 Packs",
      productType: "Drinks",
      manufacturerNameZh: "維他奶 / 維他",
      manufacturerNameEn: "VITASOY / VITA",
      recommendedTemperature: "4",
      requiredTemperatureUpper: "8",
      requiredTemperatureLower: "2",
      recommendedHumidity: "50",
      requiredHumidityUpper: "70",
      requiredHumidityLower: "50",
      lastUpdate: "0",
    },
    {
      productId: "0",
      productNameZh: "蔬果屋 - 直送香甜原裝士多啤梨（原裝1盒裝）",
      productNameEn: "Fruit House - direct delivery sweet original strawberry (original 1 box)",
      productType: "Fruits",
      manufacturerNameZh: "蔬果屋",
      manufacturerNameEn: "Vegetable Fruit House",
      recommendedTemperature: "5",
      requiredTemperatureUpper: "5",
      requiredTemperatureLower: "4",
      recommendedHumidity: "80",
      requiredHumidityUpper: "90",
      requiredHumidityLower: "70",
      lastUpdate: "0",
    },
    {
      productId: "0",
      productNameZh: "蔬果屋 - 紐西蘭/法國/南非 加拿蘋果 (8個裝)",
      productNameEn: "Fruit House - New Zealand/France/South Africa Canadian Apples (Pack of 8)",
      productType: "Fruits",
      manufacturerNameZh: "蔬果屋",
      manufacturerNameEn: "Vegetable Fruit House",
      recommendedTemperature: "5",
      requiredTemperatureUpper: "5",
      requiredTemperatureLower: "4",
      recommendedHumidity: "80",
      requiredHumidityUpper: "90",
      requiredHumidityLower: "70",
      lastUpdate: "0",
    },
    {
      productId: "0",
      productNameZh: "蔬果屋 - 澳洲 美國 多汁甜橙（6個裝）",
      productNameEn: "Fruit House - Australian American Juicy Oranges (Pack of 6)",
      productType: "Fruits",
      manufacturerNameZh: "蔬果屋",
      manufacturerNameEn: "Vegetable Fruit House",
      recommendedTemperature: "5",
      requiredTemperatureUpper: "5",
      requiredTemperatureLower: "4",
      recommendedHumidity: "80",
      requiredHumidityUpper: "90",
      requiredHumidityLower: "70",
      lastUpdate: "0",
    },
    {
      productId: "0",
      productNameZh: "芯蕎 - 日本薯仔1公斤 (1包/約1000克)",
      productNameEn: "SUM KIU - Japan Potato 1kg (1 Pack/~1000g)",
      productType: "Vegetables",
      manufacturerNameZh: "芯蕎",
      manufacturerNameEn: "SUM KIU",
      recommendedTemperature: "4",
      requiredTemperatureUpper: "8",
      requiredTemperatureLower: "3",
      recommendedHumidity: "85",
      requiredHumidityUpper: "90",
      requiredHumidityLower: "80",
      lastUpdate: "0",
    },
    {
      productId: "0",
      productNameZh: "Mix n Fresh - 本地包心羅馬生菜 (共重850-1000G)",
      productNameEn: "Mix n Fresh - Artisan Romaine Lettuce (850-1000G)",
      productType: "Vegetables",
      manufacturerNameZh: "Mix n Fresh",
      manufacturerNameEn: "Mix n Fresh",
      recommendedTemperature: "4",
      requiredTemperatureUpper: "8",
      requiredTemperatureLower: "3",
      recommendedHumidity: "85",
      requiredHumidityUpper: "90",
      requiredHumidityLower: "80",
      lastUpdate: "0",
    },
    {
      productId: "0",
      productNameZh: "新界水耕種植 - 香港菜園-有機娃娃菜 (300-350g)",
      productNameEn: "N.T. Hydroponic’s Farm - Mini pakchoi (300-350g)",
      productType: "Vegetables",
      manufacturerNameZh: "新界水耕集團有限公司",
      manufacturerNameEn: "N.T. HYDROPONICS PLANTATION GROUP LIMITED",
      recommendedTemperature: "4",
      requiredTemperatureUpper: "8",
      requiredTemperatureLower: "3",
      recommendedHumidity: "85",
      requiredHumidityUpper: "90",
      requiredHumidityLower: "80",
      lastUpdate: "0",
    },
    {
      productId: "0",
      productNameZh: "Pure Quinyuan - 純。清遠119天有機雞無皮雞胸肉 (冰鮮 0-4℃)",
      productNameEn: "Pure Quinyuan - Pure Qingyuan Organic Chicken Breast- Skin Less of 119 days (Chilled 0-4℃)",
      productType: "Frozen Food",
      manufacturerNameZh: "浩治有限公司",
      manufacturerNameEn: "ASIAN MEA INC LIMITED",
      recommendedTemperature: "0",
      requiredTemperatureUpper: "4",
      requiredTemperatureLower: "0",
      recommendedHumidity: "30",
      requiredHumidityUpper: "70",
      requiredHumidityLower: "20",
      lastUpdate: "0",
    },
    {
      productId: "0",
      productNameZh: "本地農。豬 - 瘦肉 (本地豬 0-4度)",
      productNameEn: "Markos Your Local Hog Raiser - Lean Pork (Hong Kong Pork 0-4°C)",
      productType: "Frozen Food",
      manufacturerNameZh: "本地農。豬",
      manufacturerNameEn: "Markos Your Local Hog Raiser",
      recommendedTemperature: "0",
      requiredTemperatureUpper: "4",
      requiredTemperatureLower: "0",
      recommendedHumidity: "30",
      requiredHumidityUpper: "70",
      requiredHumidityLower: "20",
      lastUpdate: "0",
    },
    {
      productId: "0",
      productNameZh: "SKYEA - 大白魚蛋",
      productNameEn: "SKYEA - Fish ball",
      productType: "Frozen Food",
      manufacturerNameZh: "大街市",
      manufacturerNameEn: "SKYEA - Fish ball",
      recommendedTemperature: "0",
      requiredTemperatureUpper: "4",
      requiredTemperatureLower: "0",
      recommendedHumidity: "30",
      requiredHumidityUpper: "70",
      requiredHumidityLower: "20",
      lastUpdate: "0",
    },
  ];

  // Create the product
  console.log("Creating the product...");

  productSample.forEach(async (product) => {
    // Run createProduct function then return the transaction details
    const tx: ContractTransaction = await supplyChain.createProduct(product);

    // Wait the transaction to be mined and confirmed on the blockchain
    const txReceipt: ContractReceipt = await tx.wait();
  });

  console.log("Finished");
};

main();