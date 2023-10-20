package android.exercise.travelhk;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatImageView;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import org.json.JSONArray;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DriverSchedulePage extends AppCompatActivity {
    private String url = "http://192.168.1.18/android/getAcceptedOrder.php";
    private driverScheduleRecyclerAdapter mAdapter;
    private RecyclerView recyclerView;
    AppCompatImageView back;
    PreferenceManager preferenceManager;
    private List<DriverCurrentOrder> orders;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.driver_schedule_page);
        preferenceManager = new PreferenceManager(getApplicationContext());
        recyclerView = findViewById(R.id.Current_my_recycler_view);
        recyclerView.setHasFixedSize(true);
        back = findViewById(R.id.BackPage1);
        getOrders();
        orders = new ArrayList<>();
        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(DriverSchedulePage.this, Driver.class);
                startActivity(intent);
            }
        });
    }

    public void getOrders(){
        StringRequest stringRequest = new StringRequest(Request.Method.POST, url
                , new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                try{
                    JSONArray array = new JSONArray(response);
                    for(int i =0; i<array.length();i++){
                        JSONObject object = array.getJSONObject(i);
                        String startAddress = object.getString("start_address");
                        String endAddress = object.getString("end_address");
                        String startDate = object.getString("start_date");
                        String startTime = object.getString("start_time");
                        String people_num = object.getString("people_num");
                        String bookingId = object.getString("booking_id");
                        String email = object.getString("email");
                        String accountid = object.getString("account_id");
                        String userName = object.getString("userName");
                        String userPhone = object.getString("userPhone");
                        DriverCurrentOrder order = new DriverCurrentOrder(startAddress,endAddress
                                ,startDate,startTime,people_num,bookingId,email,accountid,userName,userPhone);
                        orders.add(order);
                    }
                }catch (Exception e){
                    e.printStackTrace();
                    Log.d("res",response);
                    Toast.makeText(getApplicationContext(),response,Toast.LENGTH_LONG).show();
                }

                recyclerView.setLayoutManager(new LinearLayoutManager(getApplicationContext()));
                mAdapter = new driverScheduleRecyclerAdapter(DriverSchedulePage.this,orders);
                recyclerView.setAdapter(mAdapter);

                Log.d("res",response);
            }

        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(DriverSchedulePage.this, error.toString(), Toast.LENGTH_LONG).show();
            }
        }){
            @Nullable
            @Override
            protected Map<String, String> getParams() throws AuthFailureError {
                Map<String, String> data = new HashMap<>();
                data.put("driver_id", preferenceManager.getString("userID"));
                return data;
            }
        };

        RequestQueue requestQueue = Volley.newRequestQueue(getApplicationContext());
        requestQueue.add(stringRequest);
    }


}







