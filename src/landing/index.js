var yo = require('yo-yo');

module.exports = function landing(content){
      return yo`
            <div class="container landing">
              <div class="row">
                <div class="col m5 hide-on-small-only">
                  <img class="iphone" src="iphone.png"/>
                </div>
                ${content}
              </div>
            </div>`;
}