#ifndef AUTHOR_H
#define AUTHOR_H
#include<vector>
#include"article.h"
class cp_author
{
public:
	char name[30];
	int coworker_value[4000];
	int coworker_previous[4000];
	int num;
	int representation;
	int closeness_importance;
	double importance;
	vector<cp_author*>coworker;//该作者一起写作文章的人
	vector<int>coworker_num;//和coworker一一对应，代表两人一起写作文章的次数
	vector<article*>write_article;
	cp_author():importance(0),closeness_importance(0), representation(0) {}
	~cp_author(){}
	void get_coworkers();
	void get_importance();
	void get_shortest_path(cp_author* all_authors[]);
};
#endif
