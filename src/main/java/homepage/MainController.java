package homepage;

/**
 * Created by 310247318 on 02/08/2016.
 */
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.*;
import java.util.*;

@Configuration
@EnableAutoConfiguration
@ComponentScan
@Controller
public class MainController {

    private final String test = "Hello";
    dataVals hospitalNaming = new dataVals();

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String home(Model model) {

        HashMap hospitals = csvRead(model);

        /*for ( String key : hospitalNaming.hospitalNames.keySet() ) {
            System.out.println( key );
        }

*/

        return "mainPage";
    }

    @RequestMapping(value = "/radiotherapy", method = RequestMethod.GET)
    public String radiotherapy(Model model) {
        System.out.print("ccc");
        return "bar";
    }

    @RequestMapping(value = "/getData", method = RequestMethod.GET)
    @ResponseBody String getData(@RequestParam("Hospital") String hospital, @RequestParam("Field") String field) {
        String specData = (hospitalNaming.getHospDataVals(hospital, field));
        System.out.println(specData);

        return specData;
    }

    public HashMap csvRead(Model model) {

        HashMap<String, String> hospitalInfo = new HashMap<String, String>();
        HashMap<String, HashMap<String, String>> hospitalNames = new HashMap<String, HashMap<String, String>>();
        try {



            BufferedReader reader = new BufferedReader(new InputStreamReader(
                    this.getClass().getResourceAsStream("/hospitalData.csv")));

            String line;
            String headers = reader.readLine();
            List<String> headersLine = Arrays.asList(headers.split("\\|"));
            while ((line = reader.readLine()) != null) {
                hospitalInfo = new HashMap<String, String>();
                List<String> thisLine = Arrays.asList(line.split("\\|"));
                String hospName = thisLine.get(0);
                for (int i = 1; i < thisLine.size() ; i++) {
                    hospitalInfo.put(headersLine.get(i), thisLine.get(i));
                }
                hospitalNames.put(hospName,hospitalInfo);
                }
            hospitalNaming.setHospNames(hospitalNames);
        }
        catch (IOException e){
            e.printStackTrace();
        }

        return hospitalInfo;
    }

}
