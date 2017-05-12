import {PubSub, SubscriptionManager} from "graphql-subscriptions";
import {makeExecutableSchema} from "graphql-tools";

const pubsub = new PubSub();
