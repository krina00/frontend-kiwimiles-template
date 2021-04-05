import { DropdownDTO } from "../dto/dropdown.dto";

export const USER_GENDERS: DropdownDTO[] = [
    {
      name: "Male",
      code: "MALE"
    },
    {
      name: "Female",
      code: "FEMALE"
    },
    {
      name: "Non-binary",
      code: "NON BINARY"
    },
    {
      name: "Prefer Not to say",
      code: "UNKNOWN"
    },
  ]

  export const USER_TYPES: DropdownDTO[] = [
    {
      name: "Super Domain",
      code: "SUDO"
    },
    {
      name: "User",
      code: "USER"
    },
  ]