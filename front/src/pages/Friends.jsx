import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';

const Friends = () => {
  const [friendsData, setFriendsData] = useState([
    // api데이터가 없어서 임의로 넣은 test용 데이터.
    // 실제 데이터 api넣어서 다시 test!
    {
      id: 1,
      name: "김지원",
      tags: ["#열정적", "#도전적", "#사교적"],
      date: "2023.05.30",
    },
    {
      id: 2,
      name: "김지둘",
      tags: ["#열정적", "#도전적", "#사교적"],
      date: "2023.05.31",
    },
    {
      id: 3,
      name: "김지셋",
      tags: ["#열정적", "#도전적", "#사교적"],
      date: "2023.06.01",
    },
    {
      id: 4,
      name: "김지넷",
      tags: ["#열정적", "#도전적", "#사교적"],
      date: "2023.06.02",
    },
    {
      id: 5,
      name: "김지다",
      tags: ["#열정적", "#도전적", "#사교적"],
      date: "2023.06.03",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // 현재 페이지가 변경되면 데이터를 가져오기 위해 useEffect를 사용
    fetchFriendsData();
  }, [currentPage]);

  const fetchFriendsData = async () => {
    try {
      // API에서 친구 데이터를 가져오는 요청 수행
      const response = await fetch('API_URL_HERE');
      const data = await response.json();
      setFriendsData(data);
    } catch (error) {
      console.error('친구 데이터 가져오는 중 에러 발생:', error);
    }
  };

  const handlePageChange = (page) => {
    // 페이지 변경 시 현재 페이지 업데이트
    setCurrentPage(page);
  };

  // 현재 페이지에 해당하는 데이터만 반환하는 함수
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return friendsData.slice(startIndex, endIndex);
  };

  return (
    <div className='friends'>
      {/* 친구 데이터를 사용하여 내용을 표시 */}
      {getCurrentPageData().map((friend) => (
        <div className='friends-content' key={friend.id}>
          <div className='friends-content-top'>
            <div className='friends-content-title'>
              <div id='friends-name'>{friend.name}</div>
              <div id='friends-others'>님이 보는 내 모습이예요!</div>
            </div>
            <button className='friends-delete'>X</button>
          </div>

          <div className='friends-content-bottom'>
            <div className='friends-tags'>
              {friend.tags.map((tag, index) => (
                <div className={`friends-tag${index + 1}`} key={index}>
                  {tag}
                </div>
              ))}
            </div>
            <div className='friends-date'>{friend.date}</div>
          </div>
        </div>
      ))}

      <div>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={friendsData.length}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Friends;