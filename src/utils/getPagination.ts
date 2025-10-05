const POSTS_PER_PAGE = 2;

interface GetPaginationProps<T> {
  posts: T;
  page: string | number;
  isIndex?: boolean;
}

/**
 * Calculates an array of page numbers based on the total number of posts.
 * @param {number} numberOfPosts - The total number of posts to paginate
 * @returns {number[]} An array of page numbers starting from 1
 */
export const getPageNumbers = (numberOfPosts: number): number[] => {
  const numberOfPages = numberOfPosts / Number(POSTS_PER_PAGE);

  let pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
    pageNumbers = [...pageNumbers, i];
  }

  return pageNumbers;
};

/**
 * Paginates an array of posts and returns pagination metadata.
 * @template T - The type of items being paginated
 * @param {GetPaginationProps<T[]>} props - The pagination configuration
 * @param {T[]} props.posts - Array of posts to paginate
 * @param {string | number} props.page - The current page number
 * @param {boolean} [props.isIndex=false] - Whether this is the index page (first page)
 * @returns {{totalPages: number, currentPage: number, paginatedPosts: T[]}} Object containing total pages, current page number, and the paginated subset of posts
 */
export function getPagination<T>({
  posts,
  page,
  isIndex = false,
}: GetPaginationProps<T[]>): {
  totalPages: number;
  currentPage: number;
  paginatedPosts: T[];
} {
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
}
