#include"article.h"
#include"word_match.h"
#include<iostream>
#include<cstring>
using namespace std;
int compare(char list[], int a_start, int b_start, int length)
{
	int i;
	for (i = 0; i < length; i++)
	{
		if (list[a_start + i] != list[b_start + i]) return 0;
	}
	return 1;
}
int get_match_list(char list[], int num)
{
	int i, j,sum=0;
	for (i = 0; i <= num - 1; i++)
	{
		if (compare(list, 0,num - i,i)) sum++;
	}
	return sum;
}
int word_match(char origin[], char list[])
{
	int sum = 0;
	int partial_match[30];
	memset(partial_match, 0, sizeof(partial_match));
	int length1=strlen(origin), length2=strlen(list);
	int i;
	for (i = 0; i < length2; i++)
	{
		partial_match[i] = get_match_list(list,i);
	}
	int place = 0;
	while (place <= length1 - length2)
	{
		int max = -1;
		for (i = 0; i < length2; i++)
		{
			if (list[i] == origin[place + i]) max=i;
			else break;
		}
		if (max == length2 - 1) sum++;
		if (max == -1) place++;
		else place += max + 1 - partial_match[max];
	}
	return sum;
}