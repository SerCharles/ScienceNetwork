#include<iostream>
#include<fstream>
#include<cstring>
#include<map>
#include"article.h"
#include"get_between.h"
#include"author.h"
using namespace std;
ofstream out_author("out_author.json");
ofstream out_shortest_route("out_shortest_route.json");
#define n 2752
#define max 100000
int m = 0;
int author_link_num = 0, article_link_num = 0;
article* Map[n + 1];
cp_author* all_authors[4000];
vector<int> link[4000];
int link_represent[4000] = { 0 };
int link_num = 0;//最多3000
void get_flag(char total[], int *flag_start, int *flag_end)
{
	int i,length=strlen(total);
	bool compatible = 0; //内容不包含逗号为0，否则为1
	int state = 0;
	for (i = 0; i < length; i++)
	{
		if (compatible == 0)
		{
			if (total[i] == ',')
			{
				if (state > 0 && flag_end[state] == 0)
				{
					flag_end[state] = i - 1;
				}
				state++;
			}
			if (total[i] == '"')
			{
				compatible = 1;
			}
			if (total[i] != ','&&total[i] != '"'&&flag_start[state] == 0)
			{
				if (state == 5 && total[i] != '1')
				{
					flag_start[state] = -1;
					flag_end[state] = -2;
					state++;
				}
				flag_start[state] = i;
			}
		}
		else if (compatible == 1)
		{
			if (total[i] == '"')
			{
				flag_end[state] = i - 1;
				compatible = 0;
			}
			if(total[i]!='"'&&flag_start[state]==0)
			{
				if (state == 5 && total[i] != '1')
				{
					flag_start[state] = -1;
					flag_end[state] = -2;
					state++;
				}
				flag_start[state] = i;
			}
		}
	}
}
void input_data()
{
	ifstream data("papers.csv");
	int i;
	for (i = 1; i <= n; i++)
	{
		if (i == 2335)
		{
			i++;
			i--;
		}
		Map[i] = new article();
		if (Map[i] == NULL) return;
		int yr;
		char total[15000];
		int len_abst=0, len_atr=0, len_tit=0, len_kw=0, len_ref = 0,len_id=0;
		int flag_start[7], flag_end[7];
		int state = 0;
		data >> yr;
		Map[i]->year = yr;
		Map[i]->num = i;
		data.clear();
		//data.ignore();
		data.getline(total, 15000);
		int j,ii;
		memset(flag_start, 0, sizeof(flag_start)); memset(flag_end, 0, sizeof(flag_start));
		get_flag(total,&flag_start[0],&flag_end[0]);
		for (ii = 1; ii <= 6; ii++)
		{
			if (flag_start[ii] <= 0) continue;
				if (ii == 1) Map[i]->get_title(&total[flag_start[ii]], flag_end[ii] - flag_start[ii] + 1);
				if(ii==2) Map[i]->get_id(&total[flag_start[ii]], flag_end[ii] - flag_start[ii] + 1);
				if(ii==3) Map[i]->get_abstract(&total[flag_start[ii]], flag_end[ii] - flag_start[ii] + 1);
				if(ii==4) Map[i]->get_author(&total[flag_start[ii]], flag_end[ii] - flag_start[ii] + 1);
				if(ii==5) Map[i]->get_reference(&total[flag_start[ii]], flag_end[ii] - flag_start[ii] + 1);
				if(ii==6) Map[i]->get_keywords(&total[flag_start[ii]], flag_end[ii] - flag_start[ii] + 1);
		}
		
	}
}
void get_strong_link()
{
	int i,j;
	for (i = 1; i <= 3926; i++)
	{
		for (j = 1; j <= link_num; j++)
		{
			if (all_authors[i]->coworker_value[link_represent[j]] < max)
			{
				all_authors[i]->representation = link_represent[j];
				link[j].push_back(i);
				break;
			}
		}
		if (all_authors[i]->representation == 0)
		{
			link_num++;
			all_authors[i]->representation = i;
			link_represent[link_num] = i;
			link[j].push_back(i);
		}
	}
}
void generate_json_author()
{
	int i, j;
	out_author << "{\n";
	out_author << '"' << "nodes" << '"' << " :\n" << '[' << endl;
	for (i = 1; i <= 600; i++)
	{
		out_author << "{ " << '"' << "name" << '"' << " : " << '"';
		out_author << all_authors[i]->name << '"' << " , " << '"';
		out_author << "between" << '"' << " : " << all_authors[i]->importance << ", ";
		out_author << '"' << "id" << '"' << " : " << all_authors[i]->num << ", ";
		out_author << '"' << "closeness" << '"' << " : " << all_authors[i]->closeness_importance << ", ";
		out_author << '"' << "link" << '"' << ":" << all_authors[i]->representation << "}";
		if (i != 600) out_author << ',' << endl;
		else out_author << endl;
	}
	out_author << "]," << endl;

	out_author << "\n";
	out_author << '"' << "edges" << '"' << " :\n" << '[' << endl;
	for (i = 1; i <= 600; i++)
	{
		for (j = 0; j < all_authors[i]->coworker.size(); j++)
		{
			int the_begin = i, the_end = all_authors[i]->coworker[j]->num;
			if (the_begin < the_end&&the_end<=600)
			{
				author_link_num++;
				out_author << "{ " << '"' << "source" << '"' << " : ";
				out_author << the_begin-1 << " , " << '"';
				out_author << "target" << '"' << " : " << the_end-1 << "}";
				if (i != 600||j!=all_authors[i]->coworker.size()-1) out_author << ',' << endl;
				else out_author << endl;
			}
		}
	}
	out_author << "]" << endl;
	out_author << "}";
}
void generate_json_short_path()
{
	int i, j, k;
	out_shortest_route << "[" << endl;
	for (i = 1; i <= 600; i++)
	{
		out_shortest_route << "[" << endl;
		for (j = 1; j <= 600; j++)
		{
			int route_value = all_authors[i]->coworker_value[j];
			out_shortest_route << "{" << endl;
			if (route_value == max)
			{
				out_shortest_route << '"' << "size" << '"' << " : " << -1;
			}
			else if (route_value == 0)
			{
				out_shortest_route << '"' << "size" << '"' << " : " << 0;
			}
			else
			{
				int path[20];
				int the_node = j;
				for (k = 1; k <= route_value; k++)
				{
					path[route_value - k + 2] = the_node;
					the_node = all_authors[i]->coworker_previous[the_node];
				}
				path[1] = i;
				out_shortest_route << '"' << "size" << '"' << " : " << route_value <<","<<endl;
				out_shortest_route << '"' << "path" << '"' << " : [";
				for (k = 1; k <= route_value + 1; k++)
				{
					out_shortest_route << path[k]<<" ";
					if (k <= route_value) out_shortest_route << ",";
				}
				out_shortest_route << "]" << endl;
			}
			if (j != 600)
			{
				out_shortest_route << "}," << endl;
			}
			else out_shortest_route << "}" << endl;
		}
		if (i != 600)
		{
			out_shortest_route << "]," << endl;
		}
		else out_shortest_route << "]" << endl;
	}
	out_shortest_route << "]" << endl;
}
int pa[10001];
int getpa(int N)
{
	if (N == pa[N])
		return N;
	return pa[N] = getpa(pa[N]);
}
int val[5000][5000];
//void generate_circle()
int main()
{
	memset(Map, NULL, n+1);
	memset(all_authors, NULL, 4000);
	input_data();//读入数据
	int i;
	for (i = 1; i <=n ; i++)//修改引用关系
	{
		Map[i]->get_papers_refer(n, Map);
		Map[i]->get_author(m, all_authors);
	}
	for (i = 1; i <= n; i++)
	{
		get_between(i, n, Map);
	}
	for (i = 1; i <= m; i++)
	{
		all_authors[i]->get_coworkers();
		all_authors[i]->get_importance();
	}
	for (i = 1; i <= m; i++)
	{
		all_authors[i]->get_shortest_path(all_authors);
	}
	get_strong_link();
	generate_json_author();
	generate_json_short_path();
	for (int i = 1; i <= m; ++i)
		pa[i] = i;
	for (int i = 1; i <= m; ++i)
		for (auto k : all_authors[i]->coworker)
			val[i][k->num] += 3;
	int cnt = 0;
	for (int i = 1; i <= n; ++i)
	{
		map<int, int> mp;
		for (auto j : Map[i]->link)
			for (auto k : j->authors)
				mp[k->num]++;
		for (auto j : Map[i]->authors)
			for (auto k : mp)
			{
				val[j->num][k.first] += k.second;
				++cnt;
			}
	}
	ofstream out("circle.csv");
	for (int i = 1; i <= m; ++i)
		for (int j = 1; j <= m; ++j)
		{
			if (val[i][j])
				out << i << ',' << j << ',' << val[i][j] << endl;
			if (val[i][j] >= 5)
				pa[getpa(i)] = getpa(j);
		}
	out.close();


	out.open("circle.json", ios::out);
	out << R"aaaaa({"parent":[)aaaaa";
	for (int i = 1; i < m; ++i)
		out << pa[i] << ',';
	out << pa[m];
	out << "]}";
	out.close();
	return 0;
}
