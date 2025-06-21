import React, { useState } from 'react';
import styled from 'styled-components';
import CommunityLayout from '../../components/community/CommunityLayout';

const CommunityHome: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const searchTerm = (e.target as HTMLInputElement).value.trim();
      if (searchTerm) {
        console.log(`검색: ${searchTerm}`);
      }
    }
  };

  return (
    <CommunityLayout>
      <Container>
        <MainContainer>
          {/* 페이지 헤더 */}
          <PageHeader>
            <PageTitle>커뮤니티</PageTitle>
          </PageHeader>

          {/* 브레드크럼과 검색바 */}
          <NavigationBar>
            <BreadcrumbContainer>
              <BreadcrumbItem>홈</BreadcrumbItem>
              <ChevronIcon>
                <svg width="8" height="16" viewBox="0 0 8 16" fill="none">
                  <path 
                    d="M1.73 3.07L6.26 7.6L1.73 12.13" 
                    stroke="rgba(55, 56, 60, 0.61)" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </ChevronIcon>
              <BreadcrumbItem>커뮤니티</BreadcrumbItem>
              <ChevronIcon>
                <svg width="8" height="16" viewBox="0 0 8 16" fill="none">
                  <path 
                    d="M1.73 3.07L6.26 7.6L1.73 12.13" 
                    stroke="rgba(55, 56, 60, 0.61)" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </ChevronIcon>
              <BreadcrumbItem>커뮤니티 홈</BreadcrumbItem>
            </BreadcrumbContainer>
            
            <SearchContainer>
              <SearchBox>
                <SearchIcon>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path 
                      d="M14.87 14.87L10.4 10.4M12 6.5C12 9.54 9.54 12 6.5 12C3.46 12 1 9.54 1 6.5C1 3.46 3.46 1 6.5 1C9.54 1 12 3.46 12 6.5Z" 
                      stroke="rgba(55, 56, 60, 0.28)" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </SearchIcon>
                <SearchInput 
                  type="text" 
                  placeholder="검색어를 입력해주세요."
                  value={searchValue}
                  onChange={handleSearchChange}
                  onKeyUp={handleSearchSubmit}
                />
              </SearchBox>
            </SearchContainer>
          </NavigationBar>

          {/* 공지사항 섹션 */}
          <NoticeSection>
            <NoticeItem>
              <NoticeIconWrapper>
                <NoticeIcon>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path 
                      d="M17.33 7.34L14.67 4.67C14.48 4.48 14.24 4.38 14 4.38H2C1.45 4.38 1 4.83 1 5.38V14.62C1 15.17 1.45 15.62 2 15.62H14C14.24 15.62 14.48 15.52 14.67 15.33L17.33 12.66C17.71 12.28 17.71 11.72 17.33 11.34L14.67 8.67C14.48 8.48 14.48 8.14 14.67 7.95L17.33 5.28C17.71 4.9 17.71 4.34 17.33 3.96C16.95 3.58 16.39 3.58 16.01 3.96L13.34 6.63C13.15 6.82 12.81 6.82 12.62 6.63L9.95 3.96C9.57 3.58 9.01 3.58 8.63 3.96C8.25 4.34 8.25 4.9 8.63 5.28L11.3 7.95C11.49 8.14 11.49 8.48 11.3 8.67L8.63 11.34C8.25 11.72 8.25 12.28 8.63 12.66L11.3 15.33C11.49 15.52 11.73 15.62 11.97 15.62H14C14.24 15.62 14.48 15.52 14.67 15.33L17.33 12.66C17.71 12.28 17.71 11.72 17.33 11.34Z" 
                      fill="#448181"
                    />
                  </svg>
                </NoticeIcon>
              </NoticeIconWrapper>
              <NoticeTitle>상단고정 공지사항</NoticeTitle>
            </NoticeItem>
            
            <NoticeItem>
              <NoticeIconWrapper>
                <NoticeIcon>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path 
                      d="M17.33 7.34L14.67 4.67C14.48 4.48 14.24 4.38 14 4.38H2C1.45 4.38 1 4.83 1 5.38V14.62C1 15.17 1.45 15.62 2 15.62H14C14.24 15.62 14.48 15.52 14.67 15.33L17.33 12.66C17.71 12.28 17.71 11.72 17.33 11.34L14.67 8.67C14.48 8.48 14.48 8.14 14.67 7.95L17.33 5.28C17.71 4.9 17.71 4.34 17.33 3.96C16.95 3.58 16.39 3.58 16.01 3.96L13.34 6.63C13.15 6.82 12.81 6.82 12.62 6.63L9.95 3.96C9.57 3.58 9.01 3.58 8.63 3.96C8.25 4.34 8.25 4.9 8.63 5.28L11.3 7.95C11.49 8.14 11.49 8.48 11.3 8.67L8.63 11.34C8.25 11.72 8.25 12.28 8.63 12.66L11.3 15.33C11.49 15.52 11.73 15.62 11.97 15.62H14C14.24 15.62 14.48 15.52 14.67 15.33L17.33 12.66C17.71 12.28 17.71 11.72 17.33 11.34Z" 
                      fill="#448181"
                    />
                  </svg>
                </NoticeIcon>
              </NoticeIconWrapper>
              <NoticeTitle>상단고정 공지사항</NoticeTitle>
            </NoticeItem>
          </NoticeSection>

          {/* 게시글 목록 */}
          <PostsList>
            {/* 강의 질문 게시글 */}
            <PostCard>
              <PostContent>
                <PostHeader>
                  <PostTitle>커뮤니티 홈에 표시되는 강의 질문 카드입니다.</PostTitle>
                  <PostDescription>
                    어머님, 그리고 당신은 멀리 북간도에 계십니다. 소학교 때 책상을 같이 했던 아이들의 이름과 패, 경, 옥 이런 이국소녀들의 이름과 벌써 아기 어머니된 계집애들의 이름과, 가난한 이웃 사람들의 이름과, 비둘기, 강아지, 토끼, 노새, 노루, 프랑시스 잠, 라이너 마리아 릴케 이런 시인의 이름을 불러 봅니다. 딴은 밤을 세워 우는 벌레
                  </PostDescription>
                </PostHeader>
                
                <PostMeta>
                  <PostCategoryTags>
                    <PostCategory>강의 질문</PostCategory>
                    <Divider />
                    <PostSubCategory>유방영상에서 AI의 적용</PostSubCategory>
                    <Divider />
                    <PostChapter>챕터 1</PostChapter>
                  </PostCategoryTags>
                </PostMeta>
              </PostContent>
              
              <PostFooter>
                <PostAuthorInfo>
                  <AuthorAvatar>
                    <img src="https://placehold.co/24x24" alt="작성자" />
                  </AuthorAvatar>
                  <AuthorName>김*닥</AuthorName>
                  <Divider />
                  <PostDate>2025년 0월 0일 00:00</PostDate>
                </PostAuthorInfo>
                
                <PostStats>
                  <StatItem>답변 0</StatItem>
                  <Divider />
                  <StatItem>조회수 0</StatItem>
                </PostStats>
              </PostFooter>
            </PostCard>

            <PostDivider />

            {/* 스터디 게시글 */}
            <PostCard>
              <PostContent>
                <PostHeader>
                  <PostTitle>커뮤니티 홈에 표시되는 스터디 카드입니다.</PostTitle>
                  <PostDescription>
                    어머님, 그리고 당신은 멀리 북간도에 계십니다. 소학교 때 책상을 같이 했던 아이들의 이름과 패, 경, 옥 이런 이국소녀들의 이름과 벌써 아기 어머니된 계집애들의 이름과, 가난한 이웃 사람들의 이름과, 비둘기, 강아지, 토끼, 노새, 노루, 프랑시스 잠, 라이너 마리아 릴케 이런 시인의 이름을 불러 봅니다. 딴은 밤을 세워 우는 벌레
                  </PostDescription>
                </PostHeader>
                
                <PostMeta>
                  <PostCategoryTags>
                    <PostCategory>스터디</PostCategory>
                    <Divider />
                    <PostSubCategory>스터디 카테고리</PostSubCategory>
                  </PostCategoryTags>
                </PostMeta>
              </PostContent>
              
              <PostFooter>
                <PostAuthorInfo>
                  <AuthorAvatar>
                    <img src="https://placehold.co/24x24" alt="작성자" />
                  </AuthorAvatar>
                  <AuthorName>김*닥</AuthorName>
                  <Divider />
                  <PostDate>2025년 0월 0일 00:00</PostDate>
                </PostAuthorInfo>
                
                <PostStats>
                  <StatItem>댓글 0</StatItem>
                  <Divider />
                  <StatItem>조회수 0</StatItem>
                </PostStats>
              </PostFooter>
            </PostCard>

            <PostDivider />

            {/* 정보 공유 게시글 */}
            <PostCard>
              <PostContent>
                <PostHeader>
                  <PostTitle>커뮤니티 홈에 표시되는 정보 공유 카드입니다.</PostTitle>
                  <PostDescription>
                    어머님, 그리고 당신은 멀리 북간도에 계십니다. 소학교 때 책상을 같이 했던 아이들의 이름과 패, 경, 옥 이런 이국소녀들의 이름과 벌써 아기 어머니된 계집애들의 이름과, 가난한 이웃 사람들의 이름과, 비둘기, 강아지, 토끼, 노새, 노루, 프랑시스 잠, 라이너 마리아 릴케 이런 시인의 이름을 불러 봅니다. 딴은 밤을 세워 우는 벌레
                  </PostDescription>
                </PostHeader>
                
                <PostMeta>
                  <PostCategoryTags>
                    <PostCategory>정보 공유</PostCategory>
                  </PostCategoryTags>
                </PostMeta>
              </PostContent>
              
              <PostFooter>
                <PostAuthorInfo>
                  <AuthorAvatar>
                    <img src="https://placehold.co/24x24" alt="작성자" />
                  </AuthorAvatar>
                  <AuthorName>김*닥</AuthorName>
                  <Divider />
                  <PostDate>2025년 0월 0일 00:00</PostDate>
                </PostAuthorInfo>
                
                <PostStats>
                  <StatItem>댓글 0</StatItem>
                  <Divider />
                  <StatItem>조회수 0</StatItem>
                </PostStats>
              </PostFooter>
            </PostCard>

            <PostDivider />

            {/* 공지사항 게시글 */}
            <PostCard>
              <PostContent>
                <PostHeader>
                  <PostTitle>커뮤니티 홈에 표시되는 공지사항 카드입니다.</PostTitle>
                  <PostDescription>
                    어머님, 그리고 당신은 멀리 북간도에 계십니다. 소학교 때 책상을 같이 했던 아이들의 이름과 패, 경, 옥 이런 이국소녀들의 이름과 벌써 아기 어머니된 계집애들의 이름과, 가난한 이웃 사람들의 이름과, 비둘기, 강아지, 토끼, 노새, 노루, 프랑시스 잠, 라이너 마리아 릴케 이런 시인의 이름을 불러 봅니다. 딴은 밤을 세워 우는 벌레
                  </PostDescription>
                </PostHeader>
                
                <PostMeta>
                  <PostCategoryTags>
                    <PostCategory>공지사항</PostCategory>
                  </PostCategoryTags>
                </PostMeta>
              </PostContent>
              
              <PostFooter>
                <PostAuthorInfo>
                  <AuthorAvatar>
                    <img src="https://placehold.co/24x24" alt="작성자" />
                  </AuthorAvatar>
                  <AuthorName>김*닥</AuthorName>
                  <Divider />
                  <PostDate>2025년 0월 0일 00:00</PostDate>
                </PostAuthorInfo>
                
                <PostStats>
                  <StatItem>댓글 0</StatItem>
                  <Divider />
                  <StatItem>조회수 0</StatItem>
                </PostStats>
              </PostFooter>
            </PostCard>
          </PostsList>
        </MainContainer>
      </Container>
    </CommunityLayout>
  );
};

// 스타일 컴포넌트들
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: flex-start;
`;

const MainContainer = styled.div`
  width: 100%;
  max-width: 894px; /* 콘텐츠 영역의 최대 너비 */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 32px;
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
`;

const PageTitle = styled.h1`
  color: #171719;
  font-size: 40px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 700;
  line-height: 52px;
  margin: 0;
`;

const NavigationBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`;

const BreadcrumbContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

const BreadcrumbItem = styled.span`
  color: rgba(55, 56, 60, 0.61);
  font-size: 16px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.09px;
`;

const ChevronIcon = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchContainer = styled.div`
  width: 282px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchBox = styled.div`
  width: 100%;
  padding: 8px;
  background: white;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  outline: 1px solid rgba(112, 115, 124, 0.22);
  outline-offset: -1px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

const SearchIcon = styled.div`
  width: 16px;
  height: 16px;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: rgba(55, 56, 60, 0.28);
  font-size: 12px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 16.01px;
  letter-spacing: 0.30px;
  
  &::placeholder {
    color: rgba(55, 56, 60, 0.28);
  }
`;

const NoticeSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NoticeItem = styled.div`
  width: 100%;
  padding: 16px 20px;
  background: #F0F7F7;
  border-radius: 12px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #e8f3f3;
  }
`;

const NoticeIconWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NoticeIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoticeTitle = styled.div`
  flex: 1;
  color: #171719;
  font-size: 16px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.09px;
`;

const PostsList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PostCard = styled.div`
  width: 100%;
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PostHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PostTitle = styled.h3`
  color: #171719;
  font-size: 16px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.09px;
  margin: 0;
`;

const PostDescription = styled.p`
  color: rgba(46, 47, 51, 0.88);
  font-size: 14px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 21.99px;
  letter-spacing: 0.20px;
  margin: 0;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const PostCategoryTags = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

const PostCategory = styled.span`
  color: rgba(55, 56, 60, 0.61);
  font-size: 14px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  line-height: 20.01px;
  letter-spacing: 0.20px;
`;

const PostSubCategory = styled.span`
  color: rgba(55, 56, 60, 0.61);
  font-size: 14px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  line-height: 20.01px;
  letter-spacing: 0.20px;
`;

const PostChapter = styled.span`
  color: rgba(55, 56, 60, 0.61);
  font-size: 14px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  line-height: 20.01px;
  letter-spacing: 0.20px;
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostAuthorInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

const AuthorAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  outline: 1px solid rgba(112, 115, 124, 0.08);
  outline-offset: -1px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorName = styled.span`
  color: rgba(46, 47, 51, 0.88);
  font-size: 14px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  line-height: 20.01px;
  letter-spacing: 0.20px;
`;

const PostDate = styled.span`
  color: rgba(55, 56, 60, 0.61);
  font-size: 14px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 20.01px;
  letter-spacing: 0.20px;
`;

const PostStats = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const StatItem = styled.span`
  color: rgba(55, 56, 60, 0.61);
  font-size: 14px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 20.01px;
  letter-spacing: 0.20px;
`;

const Divider = styled.div`
  width: 1px;
  height: 12px;
  background: rgba(112, 115, 124, 0.22);
`;

const PostDivider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(112, 115, 124, 0.22);
`;

export default CommunityHome;