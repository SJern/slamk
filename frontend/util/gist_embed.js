const React = require('react');

const GistEmbed = React.createClass({
  propTypes: {
    gist: React.PropTypes.string.isRequired,
    file: React.PropTypes.string
  },

  statics: {
    gistCallbackId: 0,
    nextGistCallback() {
      return "embed_gist_callback_" + GistEmbed.gistCallbackId++;
    },

    stylesheetAdded: false,
    addStylesheet(href) {
      if (!GistEmbed.stylesheetAdded) {
        GistEmbed.stylesheetAdded = true;
        var link = document.createElement('link');
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = href;

        document.head.appendChild(link);
      }
    }
  },

  getInitialState() {
    return { loading: true, src: "" };
  },

  componentDidMount() {
    const gistCallback = GistEmbed.nextGistCallback();
    window[gistCallback] = function(gist) {
      if (this.isMounted()) {
        this.setState({ loading: false,src: gist.div });
        GistEmbed.addStylesheet(gist.stylesheet);
        this.props.scroll();
      }
    }.bind(this);

    let url = "https://gist.github.com/anonymous/" + this.props.gist + ".json?callback=" + gistCallback;
    if (this.props.file) {
      url += "&file=" + this.props.file;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.head.appendChild(script);
  },

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    } else {
      return <div dangerouslySetInnerHTML={{__html: this.state.src}} />;
    }
  }
});

module.exports = GistEmbed;
