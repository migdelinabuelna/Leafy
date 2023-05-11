import { Link } from "react-router-dom";
import { Header, Segment, Icon } from "semantic-ui-react";

function PageHeader({ handleLogout }) {
  return (
    <Segment clearing>
      <Header as="h2" floated="right">
        <Link to="/">
          <Icon name="home"></Icon>
        </Link>
        <Link to="/login" onClick={handleLogout}>
          Logout
        </Link>
      </Header>
    </Segment>
  );
}

export default PageHeader;