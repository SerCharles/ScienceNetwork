#include"article.h"
#include"author.h"
#include"word_match.h"
#include<iostream>
#include<cstring>
void article::get_relevance(int n,article* map[])
{
	int i, j;
	for (i = 1; i <= n; i++)
	{
		for (j = 0; j < 30; j++)
		{
			if (keyword[j][0] == 0) continue;
			relevance[i] += word_match(map[i]->title_abstract, keyword[j]);
			relevance[i] += 2 * word_match(map[i]->title, keyword[j]);
		}
	}
}
void article::get_papers_refer(int n, article* map[])
{
	int i, j;
	if (id[0] == 0) return;
	for (i = 1; i <= n; i++)
	{
		for (j = 0; j < 30; j++)
		{
			if (map[i]->referance[j][0] == 0) continue;
			if (strcmp(id, map[i]->referance[j]) == 0)
			{
				link.push_back(map[i]);
			}
		}
	}
}
void article::get_author(int &m, cp_author* all_authors[])
{
	int i, j;
	for (i = 1; i < 20; i++)
	{
		if (author[i][0] == 0) continue;
		int judge = 0;
		for (j = 1; j <= m; j++)
		{
			if (strcmp(author[i], all_authors[j]->name) == 0)
			{
				authors.push_back(all_authors[j]);
				all_authors[j]->write_article.push_back(this);
				judge = 1;
				break;
			}
		}
		if (judge == 0)
		{
			m++;
			all_authors[m] = new cp_author();
			strcpy_s(all_authors[m]->name, author[i]);
			all_authors[m]->num = m;
			authors.push_back(all_authors[m]);
			all_authors[m]->write_article.push_back(this);
		}
	}
}

