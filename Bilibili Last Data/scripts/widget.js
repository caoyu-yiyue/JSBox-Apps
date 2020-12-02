
function init(videoStats) {
  $widget.setTimeline(ctx => {

    let widget = null;
    if (ctx.family === $widgetFamily.small) {
      widget = smallWidget(videoStats);
    } else if (ctx.family === $widgetFamily.medium) {
      widget = mediumWidget(videoStats);
    }
    return widget;

  });
}


function setOneLable(symbol, text) {
  const statPart = {
    type: "hstack",
    props: {
      alignment: $widget.verticalAlignment.center,
      spacing: 2
    },
    views: [
      {
        type: "image",
        props: {
          symbol: {
           glyph: symbol,
           size: 19,
           weight: "regular" 
          }
        }
      },
      {
        type: "text",
        props: {
          text: text,
          lineLimit: 1,
          minimumScaleFactor: 0.5,
          font: {
            size: 16
          }
        }
      }
    ]
  };

  return statPart
}


function formatNumberString(number) {
  let numString = "";
  if (number < 10000) {
    numString = String(number);
  } else if (number > 10000) {
    numString = (number / 10000).toFixed(1) + "万";
  }

  return numString;
}


function smallWidget(videoStats) {
  const viewLable = setOneLable("play.circle", formatNumberString(videoStats.view));
  const likeLable = setOneLable("hand.thumbsup", formatNumberString(videoStats.like));
  const coinLable = setOneLable("bitcoinsign.circle", formatNumberString(videoStats.coin));
  const favLable = setOneLable("star", formatNumberString(videoStats.favorite));
  const replyLable = setOneLable("text.bubble", formatNumberString(videoStats.reply));
  const shareLable = setOneLable("arrowshape.turn.up.right", formatNumberString(videoStats.share));

  const statGrid = {
    type: "vgrid",
    props: {
      frame: {
        minWidth: 0,
        idealWidth: 100,
        maxWidth: Infinity,
        minHeight: 0,
        idealHeight: 100,
        maxHeight: Infinity,
      },
      padding: 10,
      columns: Array(2).fill({
        flexible: {
          minimum: 10,
          maximum: Infinity
        },
        spacing: 5,
        alignment: $widget.alignment.leading
      }),
      spacing: 20,
      alignment: $widget.horizontalAlignment.center,
      link: videoStats.link,
      widgetURL: videoStats.link
    },
    views: [viewLable, likeLable, coinLable, favLable, replyLable, shareLable]
  };

  return statGrid;
}


function mediumWidget(videoStats) {
  let mediumGrid = smallWidget(videoStats);
  // New rows property.
  mediumGrid.props.columns = Array(3).fill({
      flexible: {
      minimum: 15,
      maximum: Infinity
    },
    spacing: 20,
    alignment: $widget.alignment.leading
  })
  mediumGrid.props.spacing = 15;

  const mediumView = {
    type: "vstack",
    props: {
      alignment: $widget.horizontalAlignment.leading,
      spacing: 25,
      padding: 20
    },
    views: [
      {
        type: "text",
        props: {
          text: videoStats.title,
          lineLimit: 1,
          link: videoStats.link
        }
      }, mediumGrid
    ]
  }

  return mediumView

}


module.exports = {
  init: init
}

