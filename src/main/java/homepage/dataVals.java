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
    return hospitalNames.get(name).get(field);
    }

    public JSONObject getHospNames()   {
        Gson gson = new Gson();
        JSONObject jsonFin = new JSONObject();
        Set hospNames = hospitalNames.keySet();
        ArrayList names = new ArrayList();
        Iterator iter = hospNames.iterator();
        while (iter.hasNext()) {
            JSONObject json = new JSONObject();
            json.put("name", iter.next());
            names.add(json);
        }
        jsonFin.put("names", names);
        return jsonFin;

    }

    public void setHospNames(HashMap hospName) {
        hospitalNames = hospName;
    }

    public int getMaxVal(String field){
        Set names = hospitalNames.keySet();
        int max = 0;
        for (Object i :names) {
            int temp = Integer.parseInt(getHospDataVals(i.toString(), field).replace(",",""));
            if (temp > max) {
                max = temp;
            }
        }
        return max;
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
        jsonFin.put("names", getHospNames());
        jsonFin.put("max", getMaxVal(field));
        String jsonFinal = gson.toJson(jsonFin);
        return jsonFinal;
    }
}
