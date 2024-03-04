import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
// import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
// import { getQuestions, getRecommendedQuestions } from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";

import type { Metadata } from "next";
import { auth } from "@clerk/nextjs";
import { title } from "process";

export const metadata: Metadata = {
  title: "Home | Dev Overflow",
};

export default async function Home({ searchParams }: SearchParamsProps) {
  const { userId } = auth();

  let result;

  // if(searchParams?.filter === 'recommended') {
  //   if(userId) {
  //     result = await getRecommendedQuestions({
  //       userId,
  //       searchQuery: searchParams.q,
  //       page: searchParams.page ? +searchParams.page : 1,
  //     });
  //   } else {
  //     result = {
  //       questions: [],
  //       isNext: false,
  //     }
  //   }
  // } else {
  //   result = await getQuestions({
  //     searchQuery: searchParams.q,
  //     filter: searchParams.filter,
  //     page: searchParams.page ? +searchParams.page : 1,
  //   });
  // }

  const questions = [
    {
      _id: "1",
      title: "How to implement TypeScript interfaces?",
      tags: [
        { _id: "tag1", name: "TypeScript" },
        { _id: "tag2", name: "Interfaces" },
      ],
      author: {
        _id: "author1",
        name: "John Doe",
        picture: "profile1.jpg",
        clerkId: "clerk1",
      },
      upvotes: ["user1", "user2", "user3"],
      views: 1050,
      answers: [
        {
          text: "You can define interfaces using the 'interface' keyword.",
          author: "Jane Smith",
        },
        {
          text: "Interfaces help in defining the structure of objects.",
          author: "Bob Johnson",
        },
      ],
      createdAt: new Date(2024, 1, 15),
    },
    {
      _id: "2",
      title: "What are the benefits of using React hooks?",
      tags: [
        { _id: "tag3", name: "React" },
        { _id: "tag4", name: "Hooks" },
      ],
      author: {
        _id: "author2",
        name: "Alice Brown",
        picture: "profile2.jpg",
        clerkId: "clerk2",
      },
      upvotes: ["user4", "user5"],
      views: 7500,
      answers: [],
      createdAt: new Date(2023, 12, 15),
    },
    {
      _id: "3",
      title: "How to optimize performance in Node.js applications?",
      tags: [
        { _id: "tag5", name: "Node.js" },
        { _id: "tag6", name: "Performance" },
      ],
      author: {
        _id: "author3",
        name: "Sam Green",
        picture: "profile3.jpg",
        clerkId: "clerk3",
      },
      upvotes: ["user6", "user7", "user8"],
      views: 1200,
      answers: [
        {
          text: "You can use caching techniques to improve performance.",
          author: "Emily White",
        },
        {
          text: "Optimizing database queries can also enhance performance.",
          author: "Michael Black",
        },
      ],
      createdAt: new Date(2024, 1, 30),
    },
  ];

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions?.length > 0 ? (
          questions?.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There’s no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
      <div className="mt-10">
        {/* <Pagination 
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        /> */}
      </div>
    </>
  );
}
