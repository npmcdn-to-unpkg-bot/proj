package homepage;

import java.lang.reflect.Array;
import java.util.*;

import com.google.gson.Gson;
import org.json.simple.JSONObject;


/**
 * Created by 310247318 on 03/08/2016.
 */
public class dataVals {

    public HashMap<String, HashMap<String, String>> hospitalNames;


    public String getHospData(String name) {
        return hospitalNames.get(name).toString();
    }

    public String getHospDataVals(String name, String field) {
        //System.out.println(hospitalNames.get(name).get(field));

        //System.out.println("Total Spells");
    return hospitalNames.get(name).get(field);
    }

    public void setHospNames(HashMap hospName) {
        hospitalNames = hospName;
    }

    public String getDataAllHosp(String field) {
        Gson gson = new Gson();
        Set names = hospitalNames.keySet();
        List sepNames = new ArrayList();
        List finalFieldData = new ArrayList();
        List<JSONObject> jsonList = new ArrayList<JSONObject>();
        JSONObject jsonFin = new JSONObject();
        int spacing = 100;

        int id = 0;
        for (Object i :names) {
            sepNames.add(i);
        }
        for (Object i : sepNames) {
            JSONObject json = new JSONObject();
            String fieldData = getHospDataVals(i.toString(), field);
            json.put("x", spacing);
            json.put("y", Integer.parseInt(fieldData.replace(",","")));
            jsonList.add(json);
            finalFieldData.add(json);
            id++;
            spacing += 100;
        }

        jsonFin.put("d", finalFieldData);
        String jsonFinal = gson.toJson(jsonFin);

        return jsonFinal;
    }
}
