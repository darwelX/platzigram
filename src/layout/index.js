var yo = require('yo-yo');
//
module.exports = function layout(content){
  return yo`
      <div>
        <nav class="header">
          <div class="nav-wrapper">
            <div class="conatiner">
              <div class="row">
                <div class="col s12 m6 offset-m1">
                  <a href="/" class="brand-logo platzigram">Platzigram</a>
                </div>

                <div class="col s2 m6 push-s10 push-m10">
                  <a class="btn btn-large btn-flat dropdown-button" href="#" data-activates="drop-user">
                    <i class="fa fa-user" aria-hidden="true"></i>
                  </a>
                </div>
                <ul id="drop-user" class="dropdown-content">
                  <li>
                    <li><a href="#">Salir</a></li>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <div class="content">
          ${content}
        </div>        
      </div>`;
}