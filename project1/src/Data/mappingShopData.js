const electronicsDepartment = "electronics";
const clothesDepartment = "clothes";
const furnitureDepartment = "furniture";
const petsDepartment = "pets";
const DepartmentSelection = {
  electronics: [],
  clothes: [],
  furniture: [],
  pets: [],
};

const mapDepartments = (toMap) => {
  for (let i = 0; i < toMap.length; i++) {
    switch (toMap[i].department) {
      case electronicsDepartment:
        DepartmentSelection.electronics.push(toMap[i]);
        break;
      case clothesDepartment:
        DepartmentSelection.clothes.push(toMap[i]);
        break;
      case furnitureDepartment:
        DepartmentSelection.furniture.push(toMap[i]);
        break;
      case petsDepartment:
        DepartmentSelection.pets.push(toMap[i]);
        break;
      default:
        break;
    }
  }
  return DepartmentSelection;
};

export default mapDepartments;
