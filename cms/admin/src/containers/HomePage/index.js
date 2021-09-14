// /* eslint-disable */
import React, { memo, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { get, upperFirst } from "lodash";
import { auth, LoadingIndicatorPage } from "strapi-helper-plugin";
import PageTitle from "../../components/PageTitle";
import { useModels } from "../../hooks";
import Deployments from "strapi-plugin-vercel/admin/src/containers/HomePage";

import {
  ALink,
  Block,
  Container,
  LinkWrapper,
  P,
  Wave,
  Separator,
} from "./components";

const HomePage = ({ history: { push } }) => {
  // Temporary until we develop the menu API
  const {
    collectionTypes,
    singleTypes,
    isLoading: isLoadingForModels,
  } = useModels();

  const hasAlreadyCreatedContentTypes = useMemo(() => {
    const filterContentTypes = (contentTypes) =>
      contentTypes.filter((c) => c.isDisplayed);

    return (
      filterContentTypes(collectionTypes).length > 1 ||
      filterContentTypes(singleTypes).length > 0
    );
  }, [collectionTypes, singleTypes]);

  if (isLoadingForModels) {
    return <LoadingIndicatorPage />;
  }

  const headerId = hasAlreadyCreatedContentTypes
    ? "HomePage.greetings"
    : "app.components.HomePage.welcome";
  const username = get(auth.getUserInfo(), "firstname", "");

  return (
    <>
      <FormattedMessage id="HomePage.helmet.title">
        {(title) => <PageTitle title={title} />}
      </FormattedMessage>
      <Container className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <Block>
              <Wave />
              <FormattedMessage
                id={headerId}
                values={{
                  name: upperFirst(username),
                }}
              >
                {(msg) => <h2 id="mainHeader">{msg}</h2>}
              </FormattedMessage>
            </Block>
            <Block>
              <h3>Shortcodes:</h3>
              <P>
                We will include some shortcodes to allow you to add some
                elements in where you want. Just copy and paste the bit in pink
                with the square brackets.
              </P>
              <ul>
                <li>
                  <P>
                    Displays the project form <code>[project_form]</code>
                  </P>
                </li>
                <li>
                  <P>
                    Displays the contact form <code>[contact_form]</code>
                  </P>
                </li>
                <li>
                  <P>
                    Displays the map <code>[map]</code>
                  </P>
                </li>
                <li>
                  <P>
                    Displays the video <code>[video]</code>
                  </P>
                </li>
              </ul>
            </Block>
            <Deployments />
          </div>
        </div>
      </Container>
    </>
  );
};

export default memo(HomePage);
