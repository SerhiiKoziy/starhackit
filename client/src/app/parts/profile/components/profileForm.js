import React from "react";
import input from "components/input";
import Spinner from "components/spinner";
import Paper from "components/Paper";
import FormGroup from "components/FormGroup";

import { observer } from "mobx-react";

export default context => {
  const { tr } = context;
  const ButtonLoading = require("components/buttonLoading").default(context);
  const UsernameInput = input(context);
  const EmailInput = input(context);
  const BioInput = input(context);

  function ProfileForm({ store, profileGet, profileUpdate }) {
    const { errors } = store;
    if (profileGet.loading) {
      return <Spinner />;
    }

    return (
      <Paper>
        <form onSubmit={e => e.preventDefault()}>
          <h3>{tr.t("My Profile")}</h3>
          <FormGroup>
            <UsernameInput
              id="username"
              label={tr.t("Username")}
              value={store.username}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <EmailInput
              id="email"
              value={store.email}
              disabled
              label={tr.t("Email")}
            />
          </FormGroup>
          <br />

          <div>
            <h4>{tr.t("About Me")}</h4>
            <BioInput
              id="biography-input"
              fullWidth
              value={store.profile.biography || ""}
              error={errors.biography && errors.biography[0]}
              multiLine
              label={tr.t("Enter Biography")}
              rows={1}
              onChange={e => {
                store.profile.biography = e.target.value;
              }}
            />
          </div>

          <div className="btn-update-profile">
            <ButtonLoading
              loading={profileUpdate.loading}
              onClick={() => store.update()}
            >
              {tr.t("Update Profile")}
            </ButtonLoading>
          </div>
        </form>
      </Paper>
    );
  }
  return observer(ProfileForm);
};
