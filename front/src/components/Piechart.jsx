import React, { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';

const Piechart = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return (
        // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
        <div className='piechart' style={{ width: '100%', height: '38rem', margin: '0 auto' }}>
            <ResponsivePie
                // chart에 사용될 데이터
                data={[
                    { id: '외향형', value: 1 },
                    { id: '내향형', value: 2 },
                    { id: '감각형', value: 3 },
                    { id: '직관형', value: 4 },
                    { id: '사고형', value: 5 },
                    { id: '감정형', value: 6 },
                    { id: '인식형', value: 7 },
                    { id: '판단형', value: 8 },
                ]}

                // chart margin
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                
                // chart 중간 빈공간 반지름
                innerRadius={0.5}

                // pad 간격
                padAngle={1}

                // pad radius 설정 (pad별 간격이 있을 시 보임) */
                cornerRadius={3}

                // chart 색상
                // 1. 커스텀해서 사용할 때
                // colors={['red', 'pink', 'orange', 'skyblue', 'violet', 'green', 'purple', 'yellow']}

                // 2. nivo에서 제공해주는 색상 조합 사용할 때
                colors={{ scheme: 'pastel1' }}
                
                // pad border 두께 설정
                borderWidth={1}

                // pad border 색상 설정
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.2
                        ]
                    ]
                }}
                
                // link label skip할 기준 각도
                arcLinkLabelsSkipAngle={10}

                // link label 색상
                arcLinkLabelsTextColor="#101010"

                // link label 연결되는 선 두께
                arcLinkLabelsThickness={2}

                // link label 연결되는 선 색상
                arcLinkLabelsColor={{ from: 'color' }} // pad 색상에 따라감
                
                // label (pad에 표현되는 글씨) skip할 기준 각도
                arcLabelsSkipAngle={10}
                theme={{
                    // label style (pad에 표현되는 글씨)
                    labels: {
                        text: {
                            fontSize: '0.8rem',
                            fill: '#101010',
                            fontFamily: 'Pretendard-Regular',
                        },
                    },

                    // legend style (default로 하단에 있는 색상별 key 표시)
                    legends: {
                        text: {
                            fontSize: '1rem',
                            fill: '#101010',
                            fontFamily: 'Pretendard-Regular',
                        },
                    },
                }}

                // legend 설정 (default로 하단에 있는 색상별 key 표시)
                legends={
                    isMobile
                    ? [] // 모바일에서 범례 숨김
                    :[
                        {
                            anchor: 'bottom', // 위치
                            direction: 'row', // item 그려지는 방향
                            justify: false, // 글씨, 색상간 간격 justify 적용 여부
                            translateX: 0, // chart와 X 간격
                            translateY: 80, // chart와 Y 간격
                            itemsSpacing: 0, // item간 간격
                            itemWidth: 100, // item width
                            itemHeight: 18, // item height
                            itemDirection: 'left-to-right', // item 내부에 그려지는 방향
                            itemOpacity: 1, // item opacity
                            symbolSize: 15, // symbol (색상 표기) 크기
                            symbolShape: 'circle', // symbol (색상 표기) 모양
                            effects: [
                                {
                                    // 추가 효과 설정 (hover하면 textColor를 olive로 변경)
                                    on: 'hover',
                                    style: {
                                        itemWidth: 'olive',
                                    },
                                },
                            ],
                        },
                    ]
                }
            />
        </div>
    );
};

export default Piechart;