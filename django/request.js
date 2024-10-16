async function postFarm() {
  let bodyContent = JSON.stringify({
    name: "My Farm",
    location: "Chepalungu",
    size: 23.54,
  });
  let headersList = {
    Authorization: "Token  e695aa9901c6e369ebae9c8ceba9b234d09dfe64",
    "Content-Type": "application/json",
  };

  let response = await fetch(
    "https://fololimo-api-eight.vercel.app/api/v1/insights/farms/",
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );
  console.log(response);

//   let data = await response.text();
//   console.log(data);
}

postFarm();
