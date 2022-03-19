#include<iostream>
using namespace std;
void printstairpath(int n1 , string s=""){
          if(n1<0){
                    return;
          }
          if(n1==0){
                    cout<<s<<endl;
                    return;
          }
          printstairpath(n1-1,s+"1");
          printstairpath(n1-2,s+"2");
          printstairpath(n1-3,s+"3");
}
int main(){
          printstairpath(12);
          return 0;
}