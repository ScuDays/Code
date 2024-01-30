public class Main {


    public static int []data = {1,2,1,2,3,2};
    public static int last;
    public static int Now;
    public static void main(String[] args) {
        handling();
        }

        public static void handling(){
        for(int i = 0; i < data.length; i++)
        {
            //模拟读取一次
            Now = data[i];
            if(Now == 3){
                if(last == 1)System.out.print("2 ");
                if(last == 2)System.out.print("12 ");
            }
            else if(last == 3){
                if(Now == 2) System.out.print("12 ");
            }
            else System.out.print(Now+" ");
            last  = Now;
        }
    }
}