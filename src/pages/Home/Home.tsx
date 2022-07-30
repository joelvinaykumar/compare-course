import React from "react"
import styled from "styled-components"
import { Input, Typography, Card, Rate } from "antd"
import { VisibilityContext, ScrollMenu } from "react-horizontal-scrolling-menu"
import { SearchOutlined } from "@ant-design/icons"

type HomeProps = {

}

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const onWheel = (apiObj: scrollVisibilityApiType, ev: React.WheelEvent)  =>{
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

const HomePageSection = ({ data, title }: { data: any[], title: string }) => {
  return (
    <TopCertifications>
      <Typography.Text strong style={{fontSize: 25}}>{title}</Typography.Text>
      <ScrollMenu onWheel={onWheel}>
        {data.map((item: any, index: number) => {
          const rating = Math.random()*5
          return (
            <Card
              hoverable
              loading={false}
              key={`course-${index+1}`}
              style={{ marginRight: 20, marginTop: 10, width: 300, cursor: "pointer" }}
            >
              <Info>
                <Logo />
                <InfoTitle>
                  <Typography.Text strong>{item.course}</Typography.Text>
                  <Typography.Text type="secondary" italic> by {item.institute}</Typography.Text>
                  <Rate
                    allowHalf
                    disabled
                    count={5}
                    value={rating}
                    style={{...rating!==2.5 && { color: rating>2.5? "green": "red" }}}
                  />
                </InfoTitle>
              </Info>
            </Card>
          )
        })}
      </ScrollMenu>
    </TopCertifications>
  )
}

const Home: React.FC<HomeProps> = () => {

  const [searchQuery, setSearchQuery] = React.useState<string>("")

  const data = [
    { course: 'Course 1',
      institute: 'Institute'
    },
    {
      course: 'Course 2',
      institute: 'Institute'
    },
    {
      course: 'Course 3',
      institute: 'Institute'
    },
    {
      course: 'Course 4',
      institute: 'Institute'
    },
    {
      course: 'Course 1',
      institute: 'Institute'
    },
    {
      course: 'Course 2',
      institute: 'Institute'
    },
    {
      course: 'Course 3',
      institute: 'Institute'
    },
    {
      course: 'Course 4',
      institute: 'Institute'
    },
    {
      course: 'Course 1',
      institute: 'Institute'
    },
    {
      course: 'Course 2',
      institute: 'Institute'
    },
    {
      course: 'Course 3',
      institute: 'Institute'
    },
    {
      course: 'Course 4',
      institute: 'Institute'
    },
  ];

  return (
    <Container>
      <SearchContainer>
        <Search
          placeholder="Search online, offline courses ..."
          suffix={<SearchOutlined />}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          inputMode="search"
          size="large"
          allowClear
        />
        <Text strong>Discover best courses.</Text>
        <SubText>Competetive Exams. Courses. Certifications.</SubText>
      </SearchContainer>
      <HomePageSection  data={data} title="Top Certifications" />
      <HomePageSection  data={data} title="Best Courses" />
    </Container>
  )
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const SearchContainer = styled.div`
  width: 100%;
  min-height: 300px;
  background-color: #173753;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Search = styled(Input)`
  width: 50%;
  border-radius: 10px;
  margin-bottom: 15px;
`

const Text = styled(Typography.Text)`
  color: white;
  font-size: 18px;
`

const SubText = styled(Typography.Text)`
  color: white;
  font-size: 14px;
`

const TopCertifications = styled.div`
  margin-top: 50px;
  width: 80%;
`

const Info = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`

const InfoTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`

const Logo = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  background-color: #786fa6;
  display: flex;
  filter: drop-shadow(1px 1px 10px rgba(120, 111, 166, 0.6));
`