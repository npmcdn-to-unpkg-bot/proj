package homepage;

/**
 * Created by 310247318 on 02/08/2016.
 */
import org.springframework.context.annotation.ComponentScan;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.stereotype.Controller;

@ComponentScan
@Controller
public class MainController {

    private final String test = "Hello";

    @RequestMapping(value="/", method = RequestMethod.GET)
    public String home(Model model) {

        System.out.print("aaa");
        return "mainPage";
    }

    @RequestMapping(value="/radiotherapy", method = RequestMethod.GET)
    public String radiotherapy(Model model) {
        System.out.print("ccc");
        return "bar";
    }

    @RequestMapping(value="/test", method = RequestMethod.GET)
    public String test(Model model) {
        System.out.print("ddd");
        return "hello";
    }

}
