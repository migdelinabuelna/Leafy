import { Link } from "react-router-dom";
import { Header, Segment, Icon, Image } from "semantic-ui-react";

function PageHeader({ loggedUser, handleLogout }) {
  return (
    <Segment clearing>
      <Header as="h2" floated="right">
        <Link to="/">
          <Icon name="home"></Icon>
        </Link>
        <Link to="/login" onClick={handleLogout}>
          Logout
        </Link>
        <Header as="h2" floated="left">
        <Link to={`/${loggedUser?.username}`}>
          <Image
            src={
              loggedUser?.photoUrl
                ? loggedUser?.photoUrl
                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
            }
            avatar
          ></Image>
        </Link>
      </Header>
      </Header>
    </Segment>
  );
}

export default PageHeader;