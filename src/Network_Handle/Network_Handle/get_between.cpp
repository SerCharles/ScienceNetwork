#include<iostream>
#include<cstring>
#include<algorithm>
#include<vector>
#include"article.h"
#include"get_between.h"
using namespace std;
#define max 140226
vector<int> pre_short_path[3000];
int routes[3000] = { 0 };
double between[3000] = { 0 };
int get_min(int dist[], int visit[], int n)
{
	int i, min = max,min_point=0;
	for (i = 1; i <= n; i++)
	{
		if (visit[i] == 0 && dist[i] < min)
		{
			min = dist[i];
			min_point = i;
		}
	}
	return min_point;
}
void get_short_path(int start, int n, article* map[])
{
	int visit[3000];
	int dist[3000];
	for (int i = 1; i <= n; i++) dist[i] = max;
	memset(visit, 0, sizeof(visit));
    routes[start] = 1; dist[start] = 0;
	for(int j=1;j<=n;j++)
	{
		int point = get_min(dist, visit,n);
		if (point == 0) break;
		visit[point] = 1;
		int number = map[point]->link.size();
		int i;
		for (i = 0; i < number; i++)
		{
			int nova = map[point]->link[i]->num;
			if (dist[point] + 1 < dist[nova])
			{
				dist[nova] = dist[point] + 1;
				routes[nova] = routes[point];
				pre_short_path[nova].clear();
				pre_short_path[nova].push_back(point);
			}
			else if (dist[point] + 1 == dist[nova])
			{
				routes[nova] += routes[point];
				pre_short_path[nova].push_back(point);
			}
		}
	}
}
int belong(int a, int b)
{
	int i;
	int number = pre_short_path[b].size();
	for (i = 0; i < number; i++)
	{
		if (pre_short_path[b][i] == a) return 1;
	}
	return 0;
}
void DFS(int point, int n, article* map[],int visit[]) 
{
	visit[point] = 1;
	int number = map[point]->link.size();
		int i;
		for (i = 0; i < number; i++)
		{
			int nova = map[point]->link[i]->num;
			if (visit[nova] == 0)
			{
				DFS(nova, n, map, visit);
			}
			if (belong(point, nova))
			{
				between[point] += double(routes[point]) / double(routes[nova])*(1 + between[nova]);
			}
		}
}
void get_between(int root, int n, article* map[])
{
	int visit[3000];
	memset(routes, 0, sizeof(routes));
	memset(visit, 0, sizeof(visit));
	memset(between, 0, sizeof(between));
	for (int i = 1; i <= n; i++) pre_short_path[i].clear();
	get_short_path(root, n, map);
	DFS(root,n,map,visit);
	for (int i = 1; i <= n; i++) map[i]->between_link += between[i];
}
