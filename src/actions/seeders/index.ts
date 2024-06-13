import adminSeeder from "./adminSeeder";

const runSeeder = async () => {
  await adminSeeder();
};

runSeeder(); // This line calls the function
