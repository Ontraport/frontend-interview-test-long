/**
 * This renders the user's basic info on the main page.
 */

export default class UserRenderer {
    static renderUser( user ) {
        return $(`<div class="user-box__pic row-elem">
                    <img src="${user.pic}"></img>
                  </div>
                  <div class="user-box__name row-elem">
                  ${user.name}
                  </div>`);
    }
}
