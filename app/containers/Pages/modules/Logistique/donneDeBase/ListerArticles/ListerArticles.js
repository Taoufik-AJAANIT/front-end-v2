import React, { Component } from "react";
import { Helmet } from "react-helmet";
import brand from "enl-api/dummy/brand";
import { SourceReader, PapperBlock, PageTitle } from "enl-components";
import { injectIntl, intlShape } from "react-intl";
import messages from "./messages";
import Articles from "./types/Articles";

class ListerArticles extends Component {
  render() {
    const title = brand.name + " - Table";
    const description = brand.desc;
    const { intl } = this.props;
    return (
      <div>
        <PageTitle
          title="Lister Article"
          pathname="/Logistique/Données de base/Lister Article"
        />
        <div>
          <Articles />
        </div>
      </div>
    );
  }
}

ListerArticles.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(ListerArticles);
