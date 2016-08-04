package homepage;

import java.lang.reflect.Array;
import java.util.*;

import org.json.simple.JSONObject;


/**
 * Created by 310247318 on 03/08/2016.
 */
public class dataVals {

    public HashMap<String, HashMap<String, String>> hospitalNames;

    public JSONObject getHospNames(){
        JSONObject json = new JSONObject();
        Set names = hospitalNames.keySet();
        List sepNames = new ArrayList();
        for (Object i :names) {
            sepNames.add(i);
        }
        System.out.println(sepNames);
        json.put("Names", sepNames);
        return json;
    }

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
        Set names = hospitalNames.keySet();
        List sepNames = new ArrayList();
        List finalFieldData = new ArrayList();
        int id = 0;
        for (Object i :names) {
            sepNames.add(i);
        }
        for (Object i : sepNames) {
            JSONObject json = new JSONObject();
            String fieldData = getHospDataVals(i.toString(), field);
            json.put(i.toString(), fieldData);
            finalFieldData.add(json);
            id++;
        }

        return finalFieldData.toString();
    }
}
