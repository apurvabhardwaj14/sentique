import java.util.*;
class demo{
    static int maxApple = 0;
    public static void main(String args[]){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0;i<n;i++){
            arr[i] = sc.nextInt();
        }
        int result = collectMaxApples(n, arr);
        System.out.println(result);
    }

    static int collectMaxApples(int input1, int[] input2){
        
        int counter = 1;
        for(int i=input1 - 1; i>=0 ;i--){
            int curr = input2[i];
            curr = curr*counter;
            if(maxApple < curr){
                maxApple = curr;
            }
            counter++;
        }
        return maxApple;
    }



}
