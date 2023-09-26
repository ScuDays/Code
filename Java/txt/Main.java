import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        //String input = new String();
        /*String a = new String("Bbc");
        char[] arr = a.toCharArray();*/
       /* System.out.println(arr[0]);
        Boolean panduan  = arr[0] < 'A';
        System.out.println(panduan);*/
        /*char a = 'a';
        int b = a;
        System.out.println(b);*/

        Scanner input = new Scanner(System.in);
        String test = new String();
        test = input.nextLine();
        char[] arr = test.toCharArray();
        int xiaoxie = 0;
        int daxie = 0;
        int fuhao = 0;
        int shuzhi = 0;



        for(int i = 0; i < test.length() ;i++){
            if(arr[i] <= 90 &&arr[i] >= 65)daxie ++;
            else if(arr[i] <= 122 &&arr[i] >= 97)xiaoxie ++;
            else if(arr[i] <= 57 &&arr[i] >= 48)shuzhi ++;
            else fuhao ++;
        }
        System.out.println("大写字母有："+ daxie + "小写字母有：" + xiaoxie + "符号有：" + fuhao + "数字有：" + shuzhi);
        for(int i = arr.length-1 ; i>=0;i--  ){
            System.out.print(arr[i]);
        }
    }
}
