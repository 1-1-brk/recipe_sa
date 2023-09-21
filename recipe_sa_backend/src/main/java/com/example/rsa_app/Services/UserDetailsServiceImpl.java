package com.example.rsa_app.Services;

//@Service
public class UserDetailsServiceImpl { //implements UserDetailsService {

//    private static final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);
//    private static final Marker WARNING_MARKER = MarkerFactory.getMarker("WARNING");
//
//    private UserRepository userRepository;
//
//    public UserDetailsServiceImpl() {
//    }
//
//    @Autowired
//    public UserDetailsServiceImpl(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//
//        MyUser user = userRepository.findUserByUsername(username);
//
//        if (user == null) {
//            logger.warn(WARNING_MARKER, "Could not find user by username");
//            throw new UsernameNotFoundException("Could not find user by username");
//        }
//
////        ПРЕДЛОЖЕНИЕ ОТ БОТА
////        // Create and return a UserDetails instance using the user data
////        return org.springframework.security.core.userdetails.User.builder()
////                .username(user.getUsername())
////                .password(user.getPassword()) // Assuming password is already encoded
////                .authorities(user.getRoles())
////                .build();
//
//        return new MyUserDetails(user);
//    }
}
