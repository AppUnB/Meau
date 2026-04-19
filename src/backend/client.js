import { USE_STUB_BACKEND } from "../config/runtime";
import { firebaseClient } from "./firebaseClient";
import { stubClient } from "./stubClient";

export const backendClient = USE_STUB_BACKEND ? stubClient : firebaseClient;
