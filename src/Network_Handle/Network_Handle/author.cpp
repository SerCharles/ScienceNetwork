#include<iostream>
#include<vector>
#include"author.h"
#define max 100000
using namespace std;
void cp_author::get_coworkers()
{
	int i,j,k;
	for (i = 0; i < write_article.size(); i++)
	{
		for (j = 0; j < write_article[i]->authors.size(); j++)
		{
			int judge = 0;
			for (k = 0; k < coworker.size(); k++)
			{
				int num1 = write_article[i]->authors[j]->num, num2 = coworker[k]->num;
				if (num1 == num2)
				{
					coworker_num[k]++;
					judge = 1;
					break;
				}
			}
			if (judge == 0)
			{
				coworker_num.push_back(1);
				coworker.push_back(write_article[i]->authors[j]);
			}
		}
	}
}
void cp_author::get_importance()
{
	int i;
	for (i = 0; i < write_article.size(); i++) importance += write_article[i]->between_link;
}
void cp_author::get_shortest_path(cp_author* all_authors[])
{
	memset(coworker_previous, 0, 4000);
	for (int i = 1; i <= 3926; i++) coworker_value[i] = max;
	int i, j;
	int visit[4000];
	memset(visit, 0, 4000);
	coworker_value[this->num] = 0;
	for (int i = 1; i <= 3926; i++)
	{
		int min_value = max, min = 0;
		for (j = 1; j <= 3926; j++)
		{
			if (visit[j] == 0 && coworker_value[j] < min_value)
			{
				min = j;
				min_value = coworker_value[j];
			}
		}
		visit[min] = 1;
		if (min == 0) break;
		for (j = 0; j < all_authors[min]->coworker.size(); j++)
		{
			int next = all_authors[min]->coworker[j]->num;
			int nova = 1 + coworker_value[min];
			if (nova < coworker_value[next])
			{
				coworker_previous[next] = min;
				coworker_value[next] = nova;
			}
		}
	}
	for (i = 1; i <= 3926; i++)
	{
		if (coworker_value[i] != max) closeness_importance += coworker_value[i];
	}
}