class UserView {
    static displayForms() {
        const SUBMIT_EMAIL_ACTION = "UserController.modifyEmail();";
        const SUBMIT_PASSWORD_ACTION = "UserController.checkPasswords();";
        HtmlContent.fillWith("main", `
            <form id="modifyEmailForm" onsubmit=${SUBMIT_EMAIL_ACTION} validate>
                <div>
                    <label>Nouvelle adresse email <input class="input--text" type="email" id="userNewEmail" required /></label>
                </div>
                <div>
                    <label>Entrez votre mot de passe <input class="input--text" type="password" id="userPassword" required /></label>
                </div>
                <input id="modifyEmailButton" type="submit" value="Changer d'adresse email">
            </form>
            <form id="modifyPasswordForm" onsubmit=${SUBMIT_PASSWORD_ACTION} validate>
                <div>
                <label>Ancien mot de passe <input class="input--text" type="password" id="userOldPassword" required /></label>
                </div>
                <div>
                    <label>Nouveau mot de passe <input class="input--text" type="password" id="userNewPassword1" required /></label>
                </div>
                <div>
                <label>Confirmez le nouveau mot de passe <input class="input--text" type="password" id="userNewPassword2" required /></label>
                </div>
                <input id="modifyPasswordButton" type="submit" value="Modifier le mot de passe">
            </form>
            <button id="deleteUserButton" onclick="UserView.askConfirm();">Supprimer le compte</button>`);
    }
    static askConfirm() {
        HtmlContent.fillWith("main",
            `<p>Êtes-vous sûr de vouloir supprimer définitivement ce compte utilisateur ?</p>
        <button id="deleteYes" onclick="UserController.delete();">Oui</button>
        <button id="deleteNo" onclick="HtmlContent.clear('main');UserView.displayForms();">Non</button>`);
    }
}