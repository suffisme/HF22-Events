#include <bits/stdc++.h>

using namespace std;

const int N = 1e5+2;
vector<bool> vis(N,0);
vector<int> adj[N];

int main(){

    int n,m;
    cin>>n>>m;

    int x,y;
    for(int i=0;i<m;i++){
        cin>>x>>y;

        adj[x].push_back(y);
        adj[y].push_back(x);
    }

    queue<int> q;
    q.push(1);
    vis[1]=1;

    while(!q.empty()){
        int node = q.front();
        q.pop();
        cout<<node<<endl;

        vector<int> :: iterator it;
        for(it=adj[node].begin(); it != adj[node].end();it++){
            if(vis[*it]==0) {
                q.push(*it);
                vis[*it]=1;
            }
        }
    }


    return 0;
}