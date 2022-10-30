#include <bits/stdc++.h>

using namespace std;

const int N = 1e5+2;
vector<bool> vis(N,0);
vector<int> adj[N];

void dfs(int node){
    //preorder
    vis[node]=1;
    cout<<node<<endl;

    //inorder
    vector<int> :: iterator it;
    for(it=adj[node].begin(); it != adj[node].end();it++){
        if(vis[*it]==0) dfs(*it);
    }

}

int main(){

    int n,m;
    cin>>n>>m;

    int x,y;
    for(int i=0;i<m;i++){
        cin>>x>>y;

        adj[x].push_back(y);
        adj[y].push_back(x);
    }

     dfs(1);


    return 0;
}