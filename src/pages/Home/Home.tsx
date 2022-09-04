import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { Input, Typography, Card, Row, Col, Button } from "antd";
import { SearchOutlined, RightCircleFilled } from "@ant-design/icons";

type HomeProps = {};

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, backgroundColor: "#173753", borderRadius: "50%" }}
      onClick={onClick}
    >
      <RightCircleFilled />
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, backgroundColor: "#173753", borderRadius: "50%" }}
      onClick={onClick}
    />
  );
}

const HomePageSection = ({ data, title }: { data: any[]; title: string }) => {
  return (
    <TopCertifications>
      <CarouselHeader justify="space-between">
        <Typography.Text strong style={{ fontSize: 25, marginBottom: 20 }}>
          {title}
        </Typography.Text>
        <Button type="link">View all</Button>
      </CarouselHeader>
      <Slider
        {...{
          dots: false,
          infinite: false,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: true,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        }}
      >
        {data.map((item: any, index: number) => (
          <div style={{ marginLeft: 10 }}>
            <Card
              loading={false}
              key={`course-${index + 1}`}
              style={{
                width: 400,
                maxHeight: 160,
                cursor: "pointer",
              }}
            >
              <Info>
                <Logo />
                <InfoTitle>
                  <Typography.Text strong>{item.course}</Typography.Text>
                  <Typography.Text type="secondary" italic>
                    {" "}
                    by {item.institute}
                  </Typography.Text>
                  <Typography.Link underline>View full details</Typography.Link>
                </InfoTitle>
              </Info>
            </Card>
          </div>
        ))}
      </Slider>
    </TopCertifications>
  );
};

const Home: React.FC<HomeProps> = () => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const data = [
    {
      course: "Job ready course to crack so and so interviews in 60 days 1",
      institute: "Institute",
    },
    {
      course: "Job ready course to crack so and so interviews in 60 days 2",
      institute: "Institute",
    },
    {
      course: "Job ready course to crack so and so interviews in 60 days 3",
      institute: "Institute",
    },
    {
      course: "Job ready course to crack so and so interviews in 60 days 4",
      institute: "Institute",
    },
    {
      course: "Job ready course to crack so and so interviews in 60 days 1",
      institute: "Institute",
    },
    {
      course: "Job ready course to crack so and so interviews in 60 days 2",
      institute: "Institute",
    },
    {
      course: "Job ready course to crack so and so interviews in 60 days 3",
      institute: "Institute",
    },
    {
      course: "Job ready course to crack so and so interviews in 60 days 4",
      institute: "Institute",
    },
    {
      course: "Job ready course to crack so and so interviews in 60 days 1",
      institute: "Institute",
    },
    {
      course: "Job ready course to crack so and so interviews in 60 days 2",
      institute: "Institute",
    },
    {
      course: "Job ready course to crack so and so interviews in 60 days 3",
      institute: "Institute",
    },
    {
      course: "Job ready course to crack so and so interviews in 60 days 4",
      institute: "Institute",
    },
  ];

  return (
    <Row justify="center">
      <SearchContainer>
        <Search
          autoFocus
          placeholder="Search online, offline courses ..."
          suffix={<SearchOutlined />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          inputMode="search"
          size="large"
          allowClear
        />
        <Text strong>Discover best courses.</Text>
        <SubText>Competetive Exams. Courses. Certifications.</SubText>
      </SearchContainer>

      <Col span={22}>
        <HomePageSection data={data} title="Top Certifications" />
      </Col>
      <Col span={22}>
        <HomePageSection data={data} title="Best Courses" />
      </Col>
    </Row>
  );
};

export default Home;

const SearchContainer = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 60px;
  background-color: #173753;
  align-content: center;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Search = styled(Input)`
  width: 50%;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const Text = styled(Typography.Text)`
  color: white;
  font-size: 18px;
`;

const SubText = styled(Typography.Text)`
  color: white;
  font-size: 14px;
`;

const TopCertifications = styled.div`
  margin-top: 50px;
  width: 100%;
`;

const CarouselHeader = styled(Row)`
  width: 100%;
`

const Info = styled.div`
  display: flex;
`;

const InfoTitle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%-80px;
  flex: 1;
`;

const Logo = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  background-color: #786fa6;
  display: flex;
  filter: drop-shadow(1px 1px 10px rgba(120, 111, 166, 0.6));
  margin-right: 10px;
`;
