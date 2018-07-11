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
	vector<cp_author*>coworker;//������һ��д�����µ���
	vector<int>coworker_num;//��coworkerһһ��Ӧ����������һ��д�����µĴ���
	vector<article*>write_article;
	cp_author():importance(0),closeness_importance(0), representation(0) {}
	~cp_author(){}
	void get_coworkers();
	void get_importance();
	void get_shortest_path(cp_author* all_authors[]);
};
#endif
