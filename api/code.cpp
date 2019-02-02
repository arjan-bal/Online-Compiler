#include <bits/stdc++.h>
using namespace std;
const int N=1e5;
vector<int> lp(N+1, 0), prime;
void seive()
{
    for(int i=2; i<=N; ++i){
        if(lp[i]==0){
            lp[i]=i;
            prime.push_back(i);
        }
        for(auto j:prime){
            if(j>lp[i] || i*j>N) break;
            lp[i*j]=j;
        }
    }
}
int main()
{   
    seive();
    int x;
    cin>>x;
    for(int i=0; i<x; ++i) cout<<prime[i]<<"\n\n";
    return 0;
}