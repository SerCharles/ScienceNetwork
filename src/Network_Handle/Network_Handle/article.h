#ifndef ARTICLE_H
#define ARTICLE_H
#include<vector>
using namespace std;
class cp_author;
class article
{
public:
	char title[100];
	char id[200];
	int year;
	int num;
	double between_link;
	char title_abstract[10000];
	char keyword[30][30];
	char author[20][30];
	char referance[50][100];
	int relevance[3000];
	int article_path_value[3000];
	vector<article*>link;
	vector<cp_author*>authors;
	
public:
	article():between_link(0){}
	~article(){}
	void get_title(char a[], int length);
	void get_id(char a[], int length);
	void get_abstract(char a[],int length);
	void get_keywords(char a[],int length);
	void get_author(char a[],int length);
	void get_reference(char a[],int length);
	void get_relevance(int n, article* map[]);
	void get_papers_refer(int n, article* map[]);
	void get_author(int &m, cp_author* all_authors[]);
};




#endif
