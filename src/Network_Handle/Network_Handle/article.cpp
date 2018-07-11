#include<iostream>
#include<cstring>
#include"article.h"
#include"author.h"
#define max 100000
using namespace std;
void article::get_title(char a[], int length)
{
	int i;
	for (i = 0; i < length; i++) title[i] = a[i];
}
void article::get_id(char a[], int length)
{
	int i;
	for (i = 0; i < length; i++) id[i] = a[i];
}
void article::get_abstract(char a[], int length)
{
	int sum = -1;
	int i;

	for (i = 0; i < length; i++)
	{
		sum++;
		title_abstract[sum] = a[i];
	}
}
void article::get_keywords(char a[], int length)
{
	int sum = -1,num=0;
	int i;
	for (i = 0; i < length; i++)
	{
		if(!((a[i]>='a'&&a[i]<='z')||(a[i]>='A'&&a[i]<='Z')||a[i]=='-'||a[i]=='/'))
		{
			if (sum >= 0) num++;
			sum = -1;
		}
		else 
		{
			sum++;
			keyword[num][sum]=a[i];
		}
	}
}
void article::get_author(char a[], int length)
{
	int sum = -1,num=0;
	int i;
	for (i = 0; i < length; i++)
	{
		if(a[i]==';')
		{
			num++;
			sum = -1;
		}
		else 
		{
			sum++;
			author[num][sum]=a[i];
		}
	}
}
void article::get_reference(char a[], int length)
{
	int sum = -1, num = 0;
	int i;
	for (i = 0; i < length; i++)
	{
		if (a[i] == ';')
		{
			num++;
			sum = -1;
		}
		else
		{
			sum++;
			referance[num][sum] = a[i];
		}
	}
}


