const POSTS_PER_PAGE = 20;

interface GetPaginationProps<T> {
  posts: T;
  page: string | number;
  isIndex?: boolean;
}

export const getPageNumbers = (numberOfPosts: number) => {
  const numberOfPages = numberOfPosts / Number(POSTS_PER_PAGE);

  let pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
    pageNumbers = [...pageNumbers, i];
  }

  return pageNumbers;
};

export const getPagination = <T>({
  posts,
  page,
  isIndex = false,
}: GetPaginationProps<T[]>) => {
  const totalPagesArray = getPageNumbers(posts.length);
  const totalPages = totalPagesArray.length;

  const currentPage = isIndex
    ? 1
    : page && !isNaN(Number(page)) && totalPagesArray.includes(Number(page))
      ? Number(page)
      : 0;

  const lastPost = isIndex ? POSTS_PER_PAGE : currentPage * POSTS_PER_PAGE;
  const startPost = isIndex ? 0 : lastPost - POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startPost, lastPost);

  return {
    totalPages,
    currentPage,
    paginatedPosts,
  };
};
