import React from "react";

function ChangeRecipeDialog({ props }) {

  SAVE_ICON = `${process.env.PUBLIC_URL}websiteImgs/SaveIcon.png`;
  ALT_ICON = `${process.env.PUBLIC_URL}ALT_IMG`;



  return (
    <div className="card " key={props.recipe.id}>
      <div className="row ">
        <div
          className="col justify-content-center display-content-center"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            className="img-fluid rounded-start"
            src={this.dishPlaceholder}
            alt=""
            style={{ height: "150px", width: "150px" }}
          />
        </div>
        <div className="col-md-8" key={recipe.id}>
          <span className="card-body row justify-content-between">
            <h4 className="card-title col-4">{recipe.name}</h4>
            {this.props.use === "private" && (
              <img
                src={this.SAVE_ICON}
                alt={this.ALT_ICON}
                className="col-4 trash-icon tinyIcon"
                name={recipe.id}
                style={{ height: "35px", width: "45px" }}
                onClick={() => this.handleRecipeSave(recipe.id)}
              />
            )}
          </span>
          <p className="card-text">{recipe.instructions}</p>
          <p className="card-text">Cook Time: {recipe.cook_time} minutes</p>
          <p className="card-text">
            <small className="text-muted">
              created by {recipe.username} on{" "}
              {this.formatTimeStamp(recipe.created_at)}
            </small>
          </p>
          {recipe.updatedAt !== recipe.createdAt && (
            <p className="card-text">
              <small className="text-muted">
                updated on {this.formatTimeStamp(recipe.updated_at)}
              </small>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChangeRecipeDialog;
