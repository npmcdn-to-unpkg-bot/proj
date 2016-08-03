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

import java.io.*;
import java.util.*;

@Configuration
@EnableAutoConfiguration
@ComponentScan
@Controller
public class MainController {

    private final String test = "Hello";

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String home(Model model) {

        System.out.print("aaa ");
        csvRead();

        return "mainPage";
    }

    @RequestMapping(value = "/radiotherapy", method = RequestMethod.GET)
    public String radiotherapy(Model model) {
        System.out.print("ccc");
        return "bar";
    }

    public void csvRead() {
        HashMap<String, HashMap<String, String>> hospitalNames = new HashMap<String, HashMap<String, String>>();
        HashMap<String, String> hospitalInfo = new HashMap<String, String>();
        try {

            BufferedReader reader = new BufferedReader(new InputStreamReader(
                    this.getClass().getResourceAsStream("/hospitalData.csv")));

            String line;
            String headers = reader.readLine();
            List<String> headersLine = Arrays.asList(headers.split("\\|"));
            while ((line = reader.readLine()) != null) {
                List<String> thisLine = Arrays.asList(line.split("\\|"));
                String hospName = thisLine.get(0);
                for (int i = 1; i < thisLine.size() ; i++) {
                    hospitalInfo.put(headersLine.get(i),thisLine.get(i));
                }
                hospitalNames.put(hospName, hospitalInfo);
                System.out.print(hospitalNames);
            }
        }
        catch (IOException e){
            e.printStackTrace();
        }
    }

}
