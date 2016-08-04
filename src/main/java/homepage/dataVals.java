package homepage;

import java.util.HashMap;

/**
 * Created by 310247318 on 03/08/2016.
 */
public class dataVals {

    public HashMap<String, HashMap<String, String>> hospitalNames;

    public String getHospNames(String name){
        return hospitalNames.keySet().toString();
    }

    public String getHospData(String name) {
        return hospitalNames.get(name).toString();
    }


    public String getHospDataVals(String name, String field) {

    return hospitalNames.get(name).get(field);
    }

    public void setHospNames(HashMap hospName) {
        hospitalNames = hospName;
    }

}
