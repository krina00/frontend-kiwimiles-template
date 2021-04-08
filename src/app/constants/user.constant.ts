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
      name: "Rather Not say",
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

  export const USER_GENDERS_FILTER_OPTIONS: DropdownDTO[] = [
    {
      name: "All",
      code: null
    },
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
      name: "Others",
      code: "UNKNOWN"
    },
  ]

  export const USER_TYPE_FILTER_OPTIONS: DropdownDTO[] = [
    {
      name: "All",
      code: null
    },
    {
      name: "User",
      code: "USER"
    },
    {
      name: "Super Domain",
      code: "SUDO"
    }
  ]