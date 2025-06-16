import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../../components/layout/Layout';
import { Link } from 'react-router-dom';

const ClassIndex: React.FC = () => {
  const [bannerPage, setBannerPage] = useState(1);
  const [section1Page, setSection1Page] = useState(1);
  const [section2Page, setSection2Page] = useState(1);
  const [section3Page, setSection3Page] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  // 드래그 상태 관리 - 각 섹션별로 분리
  const [bannerDrag, setBannerDrag] = useState({
    isDragging: false,
    startX: 0,
    currentX: 0,
    offset: 0
  });
  
  const [section1Drag, setSection1Drag] = useState({
    isDragging: false,
    startX: 0,
    currentX: 0,
    offset: 0
  });
  
  const [section2Drag, setSection2Drag] = useState({
    isDragging: false,
    startX: 0,
    currentX: 0,
    offset: 0
  });
  
  const [section3Drag, setSection3Drag] = useState({
    isDragging: false,
    startX: 0,
    currentX: 0,
    offset: 0
  });
  
  // 컨테이너 참조
  const bannerRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  // 카테고리 아이콘 데이터
  const categories = [
    { id: 1, title: '제목', link: '/class/category1' },
    { id: 2, title: '제목', link: '/class/category2' },
    { id: 3, title: '제목', link: '/class/category3' },
    { id: 4, title: '제목', link: '/class/category4' },
    { id: 5, title: '제목', link: '/class/category5' },
    { id: 6, title: '제목', link: '/class/category6' },
  ];

  // 배너 데이터 (확장 가능)
  const bannerData = [
    { id: 1, image: 'https://placehold.co/1200x300/4A90E2/FFFFFF?text=Banner+1', alt: '배너 1' },
    { id: 2, image: 'https://placehold.co/1200x300/50E3C2/FFFFFF?text=Banner+2', alt: '배너 2' },
    { id: 3, image: 'https://placehold.co/1200x300/F5A623/FFFFFF?text=Banner+3', alt: '배너 3' },
    // 필요시 배너 추가 가능
  ];

  const totalBanners = bannerData.length;

  // 무한 슬라이드를 위한 확장된 배너 데이터
  const extendedBannerData = [
    bannerData[bannerData.length - 1], // 마지막 배너를 앞에 추가
    ...bannerData,
    bannerData[0] // 첫 번째 배너를 뒤에 추가
  ];

  // 클래스 카드 데이터 (각 섹션별로 3페이지씩)
  const classData = {
    1: [
      { id: 1, title: '제목', caption: '캡션', extraCaption: '추가 캡션', image: 'https://placehold.co/282x188' },
      { id: 2, title: '제목', caption: '캡션', extraCaption: '추가 캡션', image: 'https://placehold.co/282x188' },
      { id: 3, title: '제목', caption: '캡션', extraCaption: '추가 캡션', image: 'https://placehold.co/282x188' },
      { id: 4, title: '제목', caption: '캡션', extraCaption: '추가 캡션', image: 'https://placehold.co/282x188' },
    ],
    2: [
      { id: 5, title: '제목', caption: '캡션', extraCaption: '추가 캡션', image: 'https://placehold.co/282x188' },
      { id: 6, title: '제목', caption: '캡션', extraCaption: '추가 캡션', image: 'https://placehold.co/282x188' },
      { id: 7, title: '제목', caption: '캡션', extraCaption: '추가 캡션', image: 'https://placehold.co/282x188' },
      { id: 8, title: '제목', caption: '캡션', extraCaption: '추가 캡션', image: 'https://placehold.co/282x188' },
    ],
    3: [
      { id: 9, title: '제목', caption: '캡션', extraCaption: '추가 캡션', image: 'https://placehold.co/282x188' },
      { id: 10, title: '제목', caption: '캡션', extraCaption: '추가 캡션', image: 'https://placehold.co/282x188' },
      { id: 11, title: '제목', caption: '캡션', extraCaption: '추가 캡션', image: 'https://placehold.co/282x188' },
      { id: 12, title: '제목', caption: '캡션', extraCaption: '추가 캡션', image: 'https://placehold.co/282x188' },
    ]
  };

  // 자동 슬라이드 효과 (15초마다)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!bannerDrag.isDragging) {
        handleBannerPageChange('next');
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [bannerDrag.isDragging]);

  // 무한 슬라이드를 위한 transition 제어
  const [isTransitioning, setIsTransitioning] = useState(true);

  // 배너 페이지 변경 핸들러 (무한 슬라이드)
  const handleBannerPageChange = (direction: 'prev' | 'next') => {
    setIsTransitioning(true);
    
    if (direction === 'prev') {
      if (bannerPage === 1) {
        setBannerPage(bannerPage - 1); // 0으로 이동 (복사본)
      } else {
        setBannerPage(bannerPage - 1);
      }
    } else {
      if (bannerPage === totalBanners) {
        setBannerPage(bannerPage + 1); // totalBanners + 1로 이동 (복사본)
      } else {
        setBannerPage(bannerPage + 1);
      }
    }
  };

  // 무한 슬라이드 처리를 위한 useEffect
  useEffect(() => {
    if (bannerPage === 0) {
      // 첫 번째 복사본에서 실제 마지막으로 이동
      setTimeout(() => {
        setIsTransitioning(false);
        setBannerPage(totalBanners);
      }, 600);
    } else if (bannerPage === totalBanners + 1) {
      // 마지막 복사본에서 실제 첫 번째로 이동
      setTimeout(() => {
        setIsTransitioning(false);
        setBannerPage(1);
      }, 600);
    }
  }, [bannerPage, totalBanners]);

  // transition 복구
  useEffect(() => {
    if (!isTransitioning) {
      setTimeout(() => setIsTransitioning(true), 50);
    }
  }, [isTransitioning]);

  // 배너 닷 클릭 핸들러
  const handleBannerDotClick = (pageNumber: number) => {
    setIsTransitioning(true);
    setBannerPage(pageNumber);
  };

  // 검색 핸들러
  const handleSearchSubmit = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      const searchTerm = (e.target as HTMLInputElement).value.trim();
      if (searchTerm) {
        alert(`${searchTerm} 검색`);
      }
    }
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }, []);

  // 현재 실제 페이지 번호 계산
  const getCurrentPage = () => {
    if (bannerPage === 0) return totalBanners;
    if (bannerPage === totalBanners + 1) return 1;
    return bannerPage;
  };

  // 페이지 변경 핸들러들
  const handleSection1PageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && section1Page > 1) {
      setSection1Page(section1Page - 1);
    } else if (direction === 'next' && section1Page < 3) {
      setSection1Page(section1Page + 1);
    }
  };

  const handleSection2PageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && section2Page > 1) {
      setSection2Page(section2Page - 1);
    } else if (direction === 'next' && section2Page < 3) {
      setSection2Page(section2Page + 1);
    }
  };

  const handleSection3PageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && section3Page > 1) {
      setSection3Page(section3Page - 1);
    } else if (direction === 'next' && section3Page < 3) {
      setSection3Page(section3Page + 1);
    }
  };

  // 드래그 핸들러들
  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent, section: 'banner' | 'section1' | 'section2' | 'section3') => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    
    if (section === 'banner') {
      setBannerDrag({
        isDragging: true,
        startX: clientX,
        currentX: clientX,
        offset: 0
      });
    } else if (section === 'section1') {
      setSection1Drag({
        isDragging: true,
        startX: clientX,
        currentX: clientX,
        offset: 0
      });
    } else if (section === 'section2') {
      setSection2Drag({
        isDragging: true,
        startX: clientX,
        currentX: clientX,
        offset: 0
      });
    } else if (section === 'section3') {
      setSection3Drag({
        isDragging: true,
        startX: clientX,
        currentX: clientX,
        offset: 0
      });
    }
  }, []);

  const handleDragMove = useCallback((e: React.MouseEvent | React.TouchEvent, section: 'banner' | 'section1' | 'section2' | 'section3') => {
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    
    if (section === 'banner' && bannerDrag.isDragging) {
      const offset = clientX - bannerDrag.startX;
      setBannerDrag(prev => ({
        ...prev,
        currentX: clientX,
        offset: offset
      }));
    } else if (section === 'section1' && section1Drag.isDragging) {
      const offset = clientX - section1Drag.startX;
      setSection1Drag(prev => ({
        ...prev,
        currentX: clientX,
        offset: offset
      }));
    } else if (section === 'section2' && section2Drag.isDragging) {
      const offset = clientX - section2Drag.startX;
      setSection2Drag(prev => ({
        ...prev,
        currentX: clientX,
        offset: offset
      }));
    } else if (section === 'section3' && section3Drag.isDragging) {
      const offset = clientX - section3Drag.startX;
      setSection3Drag(prev => ({
        ...prev,
        currentX: clientX,
        offset: offset
      }));
    }
  }, [bannerDrag.isDragging, bannerDrag.startX, section1Drag.isDragging, section1Drag.startX, section2Drag.isDragging, section2Drag.startX, section3Drag.isDragging, section3Drag.startX]);

  const handleDragEnd = useCallback((section: 'banner' | 'section1' | 'section2' | 'section3') => {
    if (section === 'banner' && bannerDrag.isDragging) {
      const dragDistance = bannerDrag.currentX - bannerDrag.startX;
      const threshold = 100;
      
      if (dragDistance > threshold) {
        handleBannerPageChange('prev');
      } else if (dragDistance < -threshold) {
        handleBannerPageChange('next');
      }
      
      setBannerDrag({
        isDragging: false,
        startX: 0,
        currentX: 0,
        offset: 0
      });
    } else if (section === 'section1' && section1Drag.isDragging) {
      const dragDistance = section1Drag.currentX - section1Drag.startX;
      const threshold = 100;
      
      if (dragDistance > threshold && section1Page > 1) {
        setSection1Page(section1Page - 1);
      } else if (dragDistance < -threshold && section1Page < 3) {
        setSection1Page(section1Page + 1);
      }
      
      setSection1Drag({
        isDragging: false,
        startX: 0,
        currentX: 0,
        offset: 0
      });
    } else if (section === 'section2' && section2Drag.isDragging) {
      const dragDistance = section2Drag.currentX - section2Drag.startX;
      const threshold = 100;
      
      if (dragDistance > threshold && section2Page > 1) {
        setSection2Page(section2Page - 1);
      } else if (dragDistance < -threshold && section2Page < 3) {
        setSection2Page(section2Page + 1);
      }
      
      setSection2Drag({
        isDragging: false,
        startX: 0,
        currentX: 0,
        offset: 0
      });
    } else if (section === 'section3' && section3Drag.isDragging) {
      const dragDistance = section3Drag.currentX - section3Drag.startX;
      const threshold = 100;
      
      if (dragDistance > threshold && section3Page > 1) {
        setSection3Page(section3Page - 1);
      } else if (dragDistance < -threshold && section3Page < 3) {
        setSection3Page(section3Page + 1);
      }
      
      setSection3Drag({
        isDragging: false,
        startX: 0,
        currentX: 0,
        offset: 0
      });
    }
  }, [bannerDrag, section1Drag, section2Drag, section3Drag, bannerPage, section1Page, section2Page, section3Page]);

  // 전역 마우스 이벤트 핸들러
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (bannerDrag.isDragging) {
        const offset = e.clientX - bannerDrag.startX;
        setBannerDrag(prev => ({
          ...prev,
          currentX: e.clientX,
          offset: offset
        }));
      } else if (section1Drag.isDragging) {
        const offset = e.clientX - section1Drag.startX;
        setSection1Drag(prev => ({
          ...prev,
          currentX: e.clientX,
          offset: offset
        }));
      } else if (section2Drag.isDragging) {
        const offset = e.clientX - section2Drag.startX;
        setSection2Drag(prev => ({
          ...prev,
          currentX: e.clientX,
          offset: offset
        }));
      } else if (section3Drag.isDragging) {
        const offset = e.clientX - section3Drag.startX;
        setSection3Drag(prev => ({
          ...prev,
          currentX: e.clientX,
          offset: offset
        }));
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (bannerDrag.isDragging) {
        const offset = e.touches[0].clientX - bannerDrag.startX;
        setBannerDrag(prev => ({
          ...prev,
          currentX: e.touches[0].clientX,
          offset: offset
        }));
      } else if (section1Drag.isDragging) {
        const offset = e.touches[0].clientX - section1Drag.startX;
        setSection1Drag(prev => ({
          ...prev,
          currentX: e.touches[0].clientX,
          offset: offset
        }));
      } else if (section2Drag.isDragging) {
        const offset = e.touches[0].clientX - section2Drag.startX;
        setSection2Drag(prev => ({
          ...prev,
          currentX: e.touches[0].clientX,
          offset: offset
        }));
      } else if (section3Drag.isDragging) {
        const offset = e.touches[0].clientX - section3Drag.startX;
        setSection3Drag(prev => ({
          ...prev,
          currentX: e.touches[0].clientX,
          offset: offset
        }));
      }
    };

    const handleGlobalMouseUp = () => {
      if (bannerDrag.isDragging) {
        handleDragEnd('banner');
      } else if (section1Drag.isDragging) {
        handleDragEnd('section1');
      } else if (section2Drag.isDragging) {
        handleDragEnd('section2');
      } else if (section3Drag.isDragging) {
        handleDragEnd('section3');
      }
    };

    if (bannerDrag.isDragging || section1Drag.isDragging || section2Drag.isDragging || section3Drag.isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchmove', handleGlobalTouchMove);
      document.addEventListener('touchend', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [bannerDrag, section1Drag, section2Drag, section3Drag, handleDragEnd]);

  return (
    <Layout>
      <Container>
        {/* 메인 콘텐츠 컨테이너 */}
        <MainContainer>
          {/* 메인 배너 슬라이드 */}
          <BannerSection>
            <BannerSlideWrapper 
              onMouseDown={(e) => handleDragStart(e, 'banner')}
              onTouchStart={(e) => handleDragStart(e, 'banner')}
              style={{ 
                transform: `translateX(calc(-${(bannerPage) * (100/(totalBanners + 2))}% + ${bannerDrag.isDragging ? bannerDrag.offset : 0}px))`,
                transition: bannerDrag.isDragging || !isTransitioning ? 'none' : 'transform 0.6s ease',
                width: `${(totalBanners + 2) * 100}%`
              }}
            >
              {extendedBannerData.map((banner, index) => (
                <BannerSlide key={`${banner.id}-${index}`} style={{ width: `${100/(totalBanners + 2)}%` }}>
                  <BannerContainer>
                    <BannerImageWrapper>
                      <BannerImage src={banner.image} alt={banner.alt} />
                    </BannerImageWrapper>
                  </BannerContainer>
                </BannerSlide>
              ))}
            </BannerSlideWrapper>
            
            {/* 페이지네이션 닷을 배너 섹션에 고정 */}
            <BannerPaginationContainer>
              <PaginationDots>
                {bannerData.map((_, dotIndex) => (
                  <Dot 
                    key={dotIndex}
                    active={dotIndex + 1 === getCurrentPage()}
                    onClick={() => handleBannerDotClick(dotIndex + 1)}
                  />
                ))}
              </PaginationDots>
            </BannerPaginationContainer>
          </BannerSection>

          {/* 카테고리 아이콘들과 검색바 */}
          <CategorySection>
            <CategoryIconGrid>
              {categories.map((category) => (
                <CategoryIconItem key={category.id}>
                  <CategoryIconBox>
                    <CategoryIconPlaceholder />
                  </CategoryIconBox>
                  <CategoryTitle>{category.title}</CategoryTitle>
                </CategoryIconItem>
              ))}
            </CategoryIconGrid>
            
            {/* 검색바 */}
            <SearchContainer>
              <SearchBox>
                <SearchIcon>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path 
                      d="M14.375 14.375L18.125 18.125M16.25 9.375C16.25 13.1716 13.1716 16.25 9.375 16.25C5.57842 16.25 2.5 13.1716 2.5 9.375C2.5 5.57842 5.57842 2.5 9.375 2.5C13.1716 2.5 16.25 5.57842 16.25 9.375Z" 
                      stroke="rgba(55, 56, 60, 0.28)" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </SearchIcon>
                <SearchInput 
                  type="text" 
                  placeholder="검색어를 입력해 주세요. (이부분 추후 문구작성 필요)"
                  value={searchValue}
                  onChange={handleSearchChange}
                  onKeyUp={handleSearchSubmit}
                />
              </SearchBox>
            </SearchContainer>
          </CategorySection>

          {/* 첫 번째 클래스 섹션 */}
          <ClassSection>
            <SectionHeader>
              <SectionInfo>
                <SectionTitle>CONNECT TO THE WORLD</SectionTitle>
                <SectionCaption>커피챗 연자별 페이지로 이동하는 버튼입니다</SectionCaption>
              </SectionInfo>
              <PaginationControls>
                <PaginationContainer>
                  <PaginationContent>
                    <PaginationBtn 
                      onClick={() => handleSection1PageChange('prev')}
                      disabled={section1Page === 1}
                    >
                      <PaginationIcon isActive={section1Page > 1}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <path 
                            d="M11.25 13.5L6.75 9L11.25 4.5" 
                            stroke={section1Page === 1 ? "rgba(55, 56, 60, 0.28)" : "rgba(55, 56, 60, 0.61)"} 
                            strokeWidth="1.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </PaginationIcon>
                    </PaginationBtn>
                    <PaginationBtn 
                      onClick={() => handleSection1PageChange('next')}
                      disabled={section1Page === 3}
                    >
                      <PaginationIcon isRight isActive={section1Page < 3}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <path 
                            d="M6.75 4.5L11.25 9L6.75 13.5" 
                            stroke={section1Page === 3 ? "rgba(55, 56, 60, 0.28)" : "rgba(55, 56, 60, 0.61)"} 
                            strokeWidth="1.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </PaginationIcon>
                    </PaginationBtn>
                  </PaginationContent>
                </PaginationContainer>
              </PaginationControls>
            </SectionHeader>
            <SlideContainer
              ref={section1Ref}
              onMouseDown={(e) => handleDragStart(e, 'section1')}
              onTouchStart={(e) => handleDragStart(e, 'section1')}
            >
              <SlideWrapper style={{ 
                transform: `translateX(calc(-${(section1Page - 1) * (100/3)}% + ${section1Drag.isDragging ? section1Drag.offset : 0}px))`,
                transition: section1Drag.isDragging ? 'none' : 'transform 0.6s ease'
              }}>
                {Object.entries(classData).map(([pageNum, classes]) => (
                  <SlidePage key={pageNum}>
                    <ClassGrid>
                      {classes.map((classItem) => (
                        <ClassCard key={classItem.id}>
                          <ClassThumbnail>
                            <ClassImage src={classItem.image} alt="클래스 썸네일" />
                          </ClassThumbnail>
                          <ClassInfo>
                            <ClassTitle>{classItem.title}</ClassTitle>
                            <ClassCaption>{classItem.caption}</ClassCaption>
                            <ClassExtraCaption>{classItem.extraCaption}</ClassExtraCaption>
                          </ClassInfo>
                        </ClassCard>
                      ))}
                    </ClassGrid>
                  </SlidePage>
                ))}
              </SlideWrapper>
            </SlideContainer>
          </ClassSection>

          {/* 두 번째 클래스 섹션 */}
          <ClassSection>
            <SectionHeader>
              <SectionInfo>
                <SectionTitle>CONNECT TO THE WORLD</SectionTitle>
                <SectionCaption>커피챗 연자별 페이지로 이동하는 버튼입니다</SectionCaption>
              </SectionInfo>
              <PaginationControls>
                <PaginationContainer>
                  <PaginationContent>
                    <PaginationBtn 
                      onClick={() => handleSection2PageChange('prev')}
                      disabled={section2Page === 1}
                    >
                      <PaginationIcon isActive={section2Page > 1}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <path 
                            d="M11.25 13.5L6.75 9L11.25 4.5" 
                            stroke={section2Page === 1 ? "rgba(55, 56, 60, 0.28)" : "rgba(55, 56, 60, 0.61)"} 
                            strokeWidth="1.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </PaginationIcon>
                    </PaginationBtn>
                    <PaginationBtn 
                      onClick={() => handleSection2PageChange('next')}
                      disabled={section2Page === 3}
                    >
                      <PaginationIcon isRight isActive={section2Page < 3}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <path 
                            d="M6.75 4.5L11.25 9L6.75 13.5" 
                            stroke={section2Page === 3 ? "rgba(55, 56, 60, 0.28)" : "rgba(55, 56, 60, 0.61)"} 
                            strokeWidth="1.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </PaginationIcon>
                    </PaginationBtn>
                  </PaginationContent>
                </PaginationContainer>
              </PaginationControls>
            </SectionHeader>
            <SlideContainer
              ref={section2Ref}
              onMouseDown={(e) => handleDragStart(e, 'section2')}
              onTouchStart={(e) => handleDragStart(e, 'section2')}
            >
              <SlideWrapper style={{ 
                transform: `translateX(calc(-${(section2Page - 1) * (100/3)}% + ${section2Drag.isDragging ? section2Drag.offset : 0}px))`,
                transition: section2Drag.isDragging ? 'none' : 'transform 0.6s ease'
              }}>
                {Object.entries(classData).map(([pageNum, classes]) => (
                  <SlidePage key={pageNum}>
                    <ClassGrid>
                      {classes.map((classItem) => (
                        <ClassCard key={`section2-${classItem.id}`}>
                          <ClassThumbnail>
                            <ClassImage src={classItem.image} alt="클래스 썸네일" />
                          </ClassThumbnail>
                          <ClassInfo>
                            <ClassTitle>{classItem.title}</ClassTitle>
                            <ClassCaption>{classItem.caption}</ClassCaption>
                            <ClassExtraCaption>{classItem.extraCaption}</ClassExtraCaption>
                          </ClassInfo>
                        </ClassCard>
                      ))}
                    </ClassGrid>
                  </SlidePage>
                ))}
              </SlideWrapper>
            </SlideContainer>
          </ClassSection>

          {/* 세 번째 클래스 섹션 */}
          <ClassSection>
            <SectionHeader>
              <SectionInfo>
                <SectionTitle>CONNECT TO THE WORLD</SectionTitle>
                <SectionCaption>커피챗 연자별 페이지로 이동하는 버튼입니다</SectionCaption>
              </SectionInfo>
              <PaginationControls>
                <PaginationContainer>
                  <PaginationContent>
                    <PaginationBtn 
                      onClick={() => handleSection3PageChange('prev')}
                      disabled={section3Page === 1}
                    >
                      <PaginationIcon isActive={section3Page > 1}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <path 
                            d="M11.25 13.5L6.75 9L11.25 4.5" 
                            stroke={section3Page === 1 ? "rgba(55, 56, 60, 0.28)" : "rgba(55, 56, 60, 0.61)"} 
                            strokeWidth="1.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </PaginationIcon>
                    </PaginationBtn>
                    <PaginationBtn 
                      onClick={() => handleSection3PageChange('next')}
                      disabled={section3Page === 3}
                    >
                      <PaginationIcon isRight isActive={section3Page < 3}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <path 
                            d="M6.75 4.5L11.25 9L6.75 13.5" 
                            stroke={section3Page === 3 ? "rgba(55, 56, 60, 0.28)" : "rgba(55, 56, 60, 0.61)"} 
                            strokeWidth="1.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </PaginationIcon>
                    </PaginationBtn>
                  </PaginationContent>
                </PaginationContainer>
              </PaginationControls>
            </SectionHeader>
            <SlideContainer
              ref={section3Ref}
              onMouseDown={(e) => handleDragStart(e, 'section3')}
              onTouchStart={(e) => handleDragStart(e, 'section3')}
            >
              <SlideWrapper style={{ 
                transform: `translateX(calc(-${(section3Page - 1) * (100/3)}% + ${section3Drag.isDragging ? section3Drag.offset : 0}px))`,
                transition: section3Drag.isDragging ? 'none' : 'transform 0.6s ease'
              }}>
                {Object.entries(classData).map(([pageNum, classes]) => (
                  <SlidePage key={pageNum}>
                    <ClassGrid>
                      {classes.map((classItem) => (
                        <ClassCard key={`section3-${classItem.id}`}>
                          <ClassThumbnail>
                            <ClassImage src={classItem.image} alt="클래스 썸네일" />
                          </ClassThumbnail>
                          <ClassInfo>
                            <ClassTitle>{classItem.title}</ClassTitle>
                            <ClassCaption>{classItem.caption}</ClassCaption>
                            <ClassExtraCaption>{classItem.extraCaption}</ClassExtraCaption>
                          </ClassInfo>
                        </ClassCard>
                      ))}
                    </ClassGrid>
                  </SlidePage>
                ))}
              </SlideWrapper>
            </SlideContainer>
          </ClassSection>
        </MainContainer>
      </Container>
    </Layout>
  );
};

// 스타일 컴포넌트들
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
`;

/* 메인 컨테이너 */
const MainContainer = styled.div`
  max-width: ${({ theme }) => theme.layout.containerWidth};
  margin: 0 auto;
  padding: 24px ${({ theme }) => theme.layout.containerPadding} 128px;
  display: flex;
  flex-direction: column;
  gap: 64px; /* gap 다시 추가 */
  
  @media (max-width: 1024px) {
    padding: 24px ${({ theme }) => theme.layout.containerPaddingTablet} 128px;
  }
  
  @media (max-width: 768px) {
    padding: 24px ${({ theme }) => theme.layout.containerPaddingMobile} 100px;
    gap: 48px;
  }
`;

/* 배너 섹션 */
const BannerSection = styled.section`
  position: relative;
  width: 100%;
  margin-bottom: 0;
  overflow: hidden;
  border-radius: 12px;
  
  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;

const BannerSlideWrapper = styled.div`
  display: flex;
  transition: transform 0.6s ease;
  will-change: transform;
  overflow: hidden;
  cursor: grab;
  user-select: none;
  border-radius: 12px;
  
  &:active {
    cursor: grabbing;
  }
`;

const BannerSlide = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  padding: 0;
`;

const BannerContainer = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  aspect-ratio: 4/1;
  
  @media (max-width: 1024px) {
    
  }
  
  @media (max-width: 768px) {
    
  }
`;

const BannerImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  left: 0px;
  top: 0px;
  user-select: none;
  pointer-events: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
`;

const BannerPaginationContainer = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  pointer-events: auto;
  z-index: 10;
  
  @media (max-width: 768px) {
    right: 16px;
    bottom: 16px;
  }
`;

const PaginationDots = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const Dot = styled.div<{ active?: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 1000px;
  background: white;
  outline: 1px solid rgba(112, 115, 124, 0.16);
  opacity: ${props => props.active ? 1 : 0.52};
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: ${props => props.active ? 1 : 0.8};
  }
`;

const CategorySection = styled.div`
  align-self: stretch;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 32px;
  display: flex;
  
  @media (max-width: 768px) {
    gap: 24px;
  }
`;

const CategoryIconGrid = styled.div`
  height: 92px;
  justify-content: center;
  align-items: flex-end;
  gap: 12px;
  display: inline-flex;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    height: auto;
    gap: 8px;
  }
`;

const CategoryIconItem = styled.div`
  width: 116px;
  height: 92px;
  max-width: 116px;
  overflow: hidden;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  display: inline-flex;
  cursor: pointer;
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const CategoryIconBox = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const CategoryIconPlaceholder = styled.div`
  width: 64px;
  height: 64px;
  background: var(--Label-Normal, #171719);
  border-radius: 6px;
  
  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
  }
`;

const CategoryTitle = styled.div`
  align-self: stretch;
  text-align: center;
  color: var(--Label-Neutral, rgba(46, 47, 51, 0.88));
  font-size: 14px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 500;
  line-height: 20.01px;
  letter-spacing: 0.20px;
  word-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  max-width: 700px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  display: flex;
`;

const SearchBox = styled.div`
  align-self: stretch;
  height: 64px;
  padding: 12px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  border-radius: 12px;
  outline: 1px solid rgba(112, 115, 124, 0.22);
  outline-offset: -1px;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  display: inline-flex;
`;

const SearchIcon = styled.div`
  height: 20px;
  padding-left: 2px;
  padding-right: 2px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const SearchInput = styled.input`
  flex: 1 1 0;
  border: none;
  outline: none;
  background: transparent;
  color: var(--Label-Normal, #171719);
  font-size: 16px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.09px;
  
  &::placeholder {
    color: var(--Label-Assistive, rgba(55, 56, 60, 0.28));
  }
`;

/* 섹션 공통 스타일 */
const ClassSection = styled.section`
  align-self: stretch;
  overflow: hidden;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 24px;
  display: flex;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionHeader = styled.div`
  align-self: stretch;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 12px;
  display: inline-flex;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const SectionInfo = styled.div`
  flex: 1 1 0;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  display: inline-flex;
`;

const SectionTitle = styled.div`
  align-self: stretch;
  color: var(--Label-Strong, black);
  font-size: 28px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 700;
  line-height: 38.02px;
  word-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const SectionCaption = styled.div`
  align-self: stretch;
  color: var(--Label-Alternative, rgba(55, 56, 60, 0.61));
  font-size: 18px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 26.01px;
  word-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const PaginationControls = styled.div`
  height: 38px;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  display: flex;
  
  @media (max-width: 768px) {
    align-self: flex-end;
  }
`;

const PaginationContainer = styled.div`
  position: relative;
  border-radius: 10px;
  outline: 1px solid rgba(112, 115, 124, 0.16);
  outline-offset: -1px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const PaginationContent = styled.div`
  overflow: hidden;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const PaginationBtn = styled.button<{ disabled?: boolean }>`
  padding: 7px;
  justify-content: center;
  align-items: center;
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  
  &:disabled {
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(23, 23, 25, 0.04);
      border-radius: 6px;
    }
  }
  
  &:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  
  &:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;

const PaginationIcon = styled.div<{ isRight?: boolean; isActive?: boolean }>`
  height: 18px;
  width: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/* 슬라이드 애니메이션 컴포넌트 */
const SlideContainer = styled.div`
  width: 100%;
  overflow: hidden;
  cursor: grab;
  user-select: none;
  
  &:active {
    cursor: grabbing;
  }
`;

const SlideWrapper = styled.div`
  display: flex;
  width: 300%; /* 3페이지 * 100% */
  transition: transform 0.6s ease;
  will-change: transform;
`;

const SlidePage = styled.div`
  width: calc(100% / 3); /* 전체 너비의 1/3 */
  flex-shrink: 0;
`;

const ClassGrid = styled.div`
  align-self: stretch;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 24px;
  display: inline-flex;
  
  @media (max-width: 1024px) {
    gap: 16px;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const ClassCard = styled.div`
  flex: 1 1 0;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
  display: inline-flex;
  cursor: pointer;
  transition: none; /* 호버 효과 제거 */
`;

const ClassThumbnail = styled.div`
  align-self: stretch;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
  border: 1px solid rgba(112, 115, 124, 0.08);
  aspect-ratio: 3/2;
`;

const ClassImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
`;

const ClassInfo = styled.div`
  align-self: stretch;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  display: flex;
`;

const ClassTitle = styled.div`
  align-self: stretch;
  color: var(--Label-Normal, #171719);
  font-size: 16px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.09px;
  word-wrap: break-word;
`;

const ClassCaption = styled.div`
  align-self: stretch;
  color: var(--Label-Alternative, rgba(55, 56, 60, 0.61));
  font-size: 13px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.25px;
  word-wrap: break-word;
`;

const ClassExtraCaption = styled.div`
  align-self: stretch;
  color: var(--Label-Alternative, rgba(55, 56, 60, 0.61));
  font-size: 13px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.25px;
  word-wrap: break-word;
`;

export default ClassIndex;